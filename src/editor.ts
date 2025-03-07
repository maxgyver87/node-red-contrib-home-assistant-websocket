import { EditorRED } from 'node-red';

import {
    updateAreas,
    updateDevices,
    updateEntities,
    updateEntity,
    updateServices,
    updateTargetDomains,
} from './editor/data';
import { setupEditors } from './editor/editors';
import { updateIntegration } from './editor/exposenode';
import {
    onNodesAdd,
    onNodesRemove,
    setupMigrations,
    versionCheck,
} from './editor/version';
import ApiEditor from './nodes/api/editor';
import BinarySensorEditor from './nodes/binary-sensor/editor';
import ButtonEditor from './nodes/button/editor';
import CallServiceEditor from './nodes/call-service/editor';
import ConfigServerEditor from './nodes/config-server/editor';
import CurrentStateEditor from './nodes/current-state/editor';
import DeviceEditor from './nodes/device/editor';
import DeviceConfigEditor from './nodes/device-config/editor';
import EntityEditor from './nodes/entity/editor';
import EntityConfigEditor from './nodes/entity-config/editor/editor';
import EventsAllEditor from './nodes/events-all/editor';
import EventsStateEditor from './nodes/events-state/editor';
import FireEventEditor from './nodes/fire-event/editor';
import GetEntitiesEditor from './nodes/get-entities/editor';
import GetHistoryEditor from './nodes/get-history/editor';
import PollStateEditor from './nodes/poll-state/editor';
import RenderTemplateEditor from './nodes/render-template/editor';
import SensorEditor from './nodes/sensor/editor';
import SwitchEditor from './nodes/switch/editor';
import TagEditor from './nodes/tag/editor';
import TimeEditor from './nodes/time/editor';
import TriggerStateEditor from './nodes/trigger-state/editor';
import UpdateConfigEditor from './nodes/update-config/editor';
import WaitUntilEditor from './nodes/wait-until/editor';
import WebhookEditor from './nodes/webhook/editor';
import ZoneEditor from './nodes/zone/editor';

declare const RED: EditorRED;

RED.comms.subscribe('homeassistant/areas/#', updateAreas);
RED.comms.subscribe('homeassistant/devices/#', updateDevices);
RED.comms.subscribe('homeassistant/entity/#', updateEntity);
RED.comms.subscribe('homeassistant/entities/#', updateEntities);
RED.comms.subscribe('homeassistant/integration/#', updateIntegration);
RED.comms.subscribe('homeassistant/services/#', updateServices);
RED.comms.subscribe('homeassistant/targetDomains/#', updateTargetDomains);
setupMigrations();
setupEditors();
RED.events.on('nodes:add', onNodesAdd);
RED.events.on('nodes:remove', onNodesRemove);
RED.events.on('editor:open', versionCheck);

// config nodes
RED.nodes.registerType('ha-device-config', DeviceConfigEditor);
RED.nodes.registerType('ha-entity-config', EntityConfigEditor);
RED.nodes.registerType('server', ConfigServerEditor);

// general nodes
RED.nodes.registerType('ha-api', ApiEditor);
RED.nodes.registerType('api-call-service', CallServiceEditor);
RED.nodes.registerType('api-current-state', CurrentStateEditor);
RED.nodes.registerType('ha-device', DeviceEditor);
RED.nodes.registerType('ha-entity', EntityEditor);
RED.nodes.registerType('server-events', EventsAllEditor);
RED.nodes.registerType('server-state-changed', EventsStateEditor);
RED.nodes.registerType('ha-fire-event', FireEventEditor);
RED.nodes.registerType('ha-get-entities', GetEntitiesEditor);
RED.nodes.registerType('api-get-history', GetHistoryEditor);
RED.nodes.registerType('poll-state', PollStateEditor);
RED.nodes.registerType('api-render-template', RenderTemplateEditor);
RED.nodes.registerType('ha-tag', TagEditor);
RED.nodes.registerType('ha-time', TimeEditor);
RED.nodes.registerType('trigger-state', TriggerStateEditor);
RED.nodes.registerType('ha-wait-until', WaitUntilEditor);
RED.nodes.registerType('ha-webhook', WebhookEditor);
RED.nodes.registerType('ha-zone', ZoneEditor);

// entities nodes
RED.nodes.registerType('ha-binary-sensor', BinarySensorEditor);
RED.nodes.registerType('ha-button', ButtonEditor);
RED.nodes.registerType('ha-sensor', SensorEditor);
RED.nodes.registerType('ha-switch', SwitchEditor);
RED.nodes.registerType('ha-update-config', UpdateConfigEditor);
