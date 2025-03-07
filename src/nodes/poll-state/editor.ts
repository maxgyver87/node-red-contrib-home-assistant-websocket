import { EditorNodeDef, EditorNodeProperties, EditorRED } from 'node-red';

import { hassAutocomplete } from '../../editor/components/hassAutocomplete';
import * as ifState from '../../editor/components/ifstate';
import * as exposeNode from '../../editor/exposenode';
import ha, { NodeCategory, NodeColor } from '../../editor/ha';
import * as haServer from '../../editor/haserver';
import { HassExposedConfig, StateType } from '../../editor/types';

declare const RED: EditorRED;

interface PollStateEditorNodeProperties extends EditorNodeProperties {
    server: string;
    version: number;
    exposeToHomeAssistant: boolean;
    haConfig: HassExposedConfig[];
    updateinterval: string;
    updateIntervalType: 'num' | 'jsonata';
    updateIntervalUnits: 'seconds' | 'minutes' | 'hours';
    outputinitially: boolean;
    outputonchanged: boolean;
    entity_id: string;
    state_type: StateType;
    halt_if: string;
    halt_if_type: string;
    halt_if_compare: string;
}

const PollStateEditor: EditorNodeDef<PollStateEditorNodeProperties> = {
    category: NodeCategory.HomeAssistant,
    color: NodeColor.HaBlue,
    inputs: 0,
    outputs: 1,
    outputLabels: ["'If State' is true", "'If State' is false"],
    icon: 'ha-poll-state.svg',
    paletteLabel: 'poll state',
    label: function () {
        return this.name || `poll state: ${this.entity_id}`;
    },
    labelStyle: ha.labelStyle,
    defaults: {
        name: { value: '' },
        server: { value: '', type: 'server', required: true },
        version: { value: RED.settings.get('pollStateVersion', 0) },
        exposeToHomeAssistant: { value: false },
        haConfig: {
            value: [
                { property: 'name', value: '' },
                { property: 'icon', value: '' },
            ],
        },
        updateinterval: { value: '60' },
        updateIntervalType: { value: 'num' },
        updateIntervalUnits: { value: 'seconds' },
        outputinitially: { value: false },
        outputonchanged: { value: false },
        entity_id: { value: '', required: true },
        state_type: { value: 'str' },
        halt_if: { value: '' },
        halt_if_type: { value: 'str' },
        halt_if_compare: { value: 'is' },
        outputs: { value: 1 },
    },
    oneditprepare: function () {
        ha.setup(this);
        haServer.init(this, '#node-input-server');
        exposeNode.init(this);
        hassAutocomplete({ root: '#node-input-entity_id' });

        $('#node-input-updateinterval').typedInput({
            types: ['num', 'jsonata'],
            typeField: '#node-input-updateIntervalType',
        });

        ifState.init('#node-input-halt_if', '#node-input-halt_if_compare');
    },
    oneditsave: function () {
        const outputs = $('#node-input-halt_if').val() ? 2 : 1;
        $('#node-input-outputs').val(outputs);
        this.haConfig = exposeNode.getValues();
    },
};

export default PollStateEditor;
