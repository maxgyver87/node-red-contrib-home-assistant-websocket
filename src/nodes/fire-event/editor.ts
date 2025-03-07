import { EditorNodeDef, EditorNodeProperties, EditorRED } from 'node-red';

import ha, { NodeCategory, NodeColor } from '../../editor/ha';
import * as haServer from '../../editor/haserver';

declare const RED: EditorRED;

interface FireEventEditorNodeProperties extends EditorNodeProperties {
    server: string;
    version: number;
    event: string;
    data: string;
    dataType: 'json' | 'jsonata';
}

const FireEventEditor: EditorNodeDef<FireEventEditorNodeProperties> = {
    category: NodeCategory.HomeAssistant,
    color: NodeColor.HaBlue,
    inputs: 1,
    outputs: 1,
    icon: 'ha-fire-event.svg',
    align: 'right',
    paletteLabel: 'fire event',
    label: function () {
        return this.name || `Event: ${this.event}`;
    },
    labelStyle: ha.labelStyle,
    defaults: {
        name: { value: '' },
        server: { value: '', type: 'server', required: true },
        version: { value: RED.settings.get('haFireEventVersion', 0) },
        event: { value: '' },
        data: { value: '' },
        dataType: { value: 'jsonata' },
    },
    oneditprepare: function () {
        ha.setup(this);
        haServer.init(this, '#node-input-server');

        $('#node-input-data').typedInput({
            types: ['json', 'jsonata'],
            typeField: '#node-input-dataType',
        });
    },
};

export default FireEventEditor;
