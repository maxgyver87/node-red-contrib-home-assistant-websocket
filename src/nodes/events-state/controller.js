const cloneDeep = require('lodash.clonedeep');
const selectn = require('selectn');

const EventsHaNode = require('../EventsHaNode');
const {
    shouldIncludeEvent,
    getWaitStatusText,
    getTimeInMilliseconds,
} = require('../../helpers/utils');

const nodeOptions = {
    config: {
        entityidfilter: {},
        entityidfiltertype: {},
        haltIfState: (nodeDef) =>
            nodeDef.haltifstate ? nodeDef.haltifstate.trim() : null,
        halt_if_type: {},
        halt_if_compare: {},
        outputinitially: {},
        state_type: {},
        output_only_on_state_change: {},
        for: {},
        forType: {},
        forUnits: {},
        ignorePrevStateNull: {},
        ignorePrevStateUnknown: {},
        ignorePrevStateUnavailable: {},
        ignoreCurrentStateUnknown: {},
        ignoreCurrentStateUnavailable: {},
        outputProperties: {},
    },
};

class EventsState extends EventsHaNode {
    constructor({ node, config, RED, status }) {
        super({ node, config, RED, status, nodeOptions });
        let eventTopic = 'ha_events:state_changed';
        this.topics = [];

        if (this.nodeConfig.entityidfiltertype === 'exact') {
            eventTopic =
                this.eventTopic = `ha_events:state_changed:${this.nodeConfig.entityidfilter?.trim()}`;
        }

        this.addEventClientListener(
            eventTopic,
            this.onHaEventsStateChanged.bind(this)
        );

        if (this.nodeConfig.outputinitially) {
            // Here for when the node is deploy without the server config being deployed
            if (this.isHomeAssistantRunning) {
                this.onDeploy();
            } else {
                this.addEventClientListener(
                    'ha_client:initial_connection_ready',
                    this.onStatesLoaded.bind(this)
                );
            }
        }
    }

    onHaEventsStateChanged(evt, runAll) {
        if (
            this.isEnabled === false ||
            !this.isHomeAssistantRunning ||
            !this.isEventValid(evt)
        ) {
            return;
        }

        const config = this.nodeConfig;
        const eventMessage = cloneDeep(evt);
        const entityId = eventMessage.entity_id;
        const oldEntity = selectn('event.old_state', eventMessage);
        const newEntity = selectn('event.new_state', eventMessage);
        // Convert and save original state if needed
        this.castState(oldEntity, config.state_type);
        this.castState(newEntity, config.state_type);
        const oldState = oldEntity ? oldEntity.state : undefined;
        const newState = newEntity ? newEntity.state : undefined;

        // Output only on state change
        if (
            runAll === undefined &&
            config.output_only_on_state_change === true &&
            oldState === newState
        ) {
            return;
        }

        // Get if state condition
        const isIfState = this.getComparatorResult(
            config.halt_if_compare,
            config.haltIfState,
            newState,
            config.halt_if_type,
            {
                entity: newEntity,
                prevEntity: oldEntity,
            }
        );

        // Track multiple entity ids
        this.topics[entityId] = this.topics[entityId] || {};

        const timer = this.getTimerValue();

        const validTimer = timer > 0;

        if (validTimer) {
            if (
                // If the ifState is not used and prev and current state are the same return because timer should already be running
                oldState === newState ||
                // Don't run timers for on connection updates
                runAll ||
                // Timer already active and ifState is still true turn don't update
                (config.haltIfState &&
                    isIfState &&
                    this.topics[entityId].active)
            ) {
                return;
            }

            if (config.haltIfState && !isIfState) {
                this.topics[entityId].active = false;
            }
        }

        if (
            !validTimer ||
            (config.haltIfState && !isIfState) ||
            eventMessage.event_type === 'triggered'
        ) {
            this.output(eventMessage, isIfState);
            return;
        }

        const statusText = getWaitStatusText(timer, this.nodeConfig.forUnits);
        const timeout = getTimeInMilliseconds(timer, this.nodeConfig.forUnits);

        this.status.setText(statusText);

        clearTimeout(this.topics[entityId].id);
        this.topics[entityId].active = true;
        this.topics[entityId].id = setTimeout(
            this.output.bind(this, eventMessage, isIfState),
            timeout
        );
    }

    getTimerValue() {
        if (this.nodeConfig.for === '') return 0;
        const timer = this.getTypedInputValue(
            this.nodeConfig.for,
            this.nodeConfig.forType
        );

        if (isNaN(timer) || timer < 0) {
            throw new Error(`Invalid value for 'for': ${timer}`);
        }

        return timer;
    }

    output(eventMessage, condition) {
        const config = this.nodeConfig;
        const message = {};
        try {
            this.setCustomOutputs(config.outputProperties, message, {
                config,
                entity: eventMessage.event.new_state,
                entityState: eventMessage.event.new_state.state,
                eventData: eventMessage.event,
                prevEntity: eventMessage.event.old_state,
                triggerId: eventMessage.entity_id,
            });
        } catch (e) {
            this.status.setFailed('error');
            return;
        }

        eventMessage.event.new_state.timeSinceChangedMs =
            Date.now() -
            new Date(eventMessage.event.new_state.last_changed).getTime();

        const statusMessage = `${eventMessage.event.new_state.state}${
            eventMessage.event.event_type === 'triggered' ? ` (triggered)` : ''
        }`;

        clearTimeout(this.topics[eventMessage.entity_id].id);

        if (config.haltIfState && !condition) {
            this.status.setFailed(statusMessage);
            this.send([null, message]);
            return;
        }

        this.status.setSuccess(statusMessage);
        this.send([message, null]);
    }

    getNodeEntityId() {
        return (
            this.nodeConfig.entityidfiltertype === 'exact' &&
            this.nodeConfig.entityidfilter
        );
    }

    triggerNode(eventMessage) {
        this.onHaEventsStateChanged(eventMessage, false);
    }

    onDeploy() {
        const entities = this.homeAssistant.getStates();
        this.onStatesLoaded(entities);
    }

    onStatesLoaded(entities) {
        if (!this.isEnabled) return;

        for (const entityId in entities) {
            const eventMessage = {
                event_type: 'state_changed',
                entity_id: entityId,
                event: {
                    entity_id: entityId,
                    old_state: entities[entityId],
                    new_state: entities[entityId],
                },
            };

            this.onHaEventsStateChanged(eventMessage, true);
        }
    }

    isEventValid(evt) {
        const oldState = selectn('event.old_state.state', evt);
        const newState = selectn('event.new_state.state', evt);
        if (
            !shouldIncludeEvent(
                evt.entity_id,
                this.nodeConfig.entityidfilter,
                this.nodeConfig.entityidfiltertype
            ) ||
            (this.nodeConfig.ignorePrevStateNull && !evt.event.old_state) ||
            (this.nodeConfig.ignorePrevStateUnknown &&
                oldState === 'unknown') ||
            (this.nodeConfig.ignorePrevStateUnavailable &&
                oldState === 'unavailable') ||
            (this.nodeConfig.ignoreCurrentStateUnknown &&
                newState === 'unknown') ||
            (this.nodeConfig.ignoreCurrentStateUnavailable &&
                newState === 'unavailable')
        ) {
            return false;
        }

        return true;
    }
}

module.exports = EventsState;
