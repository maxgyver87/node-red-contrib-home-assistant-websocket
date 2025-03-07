import { Connection, getCollection } from 'home-assistant-js-websocket';
import { Store } from 'home-assistant-js-websocket/dist/store';

import {
    HassAreas,
    HassDevices,
    HassEntityRegistryEntry,
} from '../types/home-assistant';

export function subscribeAreaRegistry(
    conn: Connection,
    cb: (state: HassAreas) => void
): void {
    const fetchAreaRegistry = (conn: Connection) =>
        conn.sendMessagePromise<HassAreas>({
            type: 'config/area_registry/list',
        });

    const subscribeUpdates = (conn: Connection, store: Store<HassAreas>) =>
        conn.subscribeEvents(async () => {
            const areas = await fetchAreaRegistry(conn);
            store.setState(areas, true);
        }, 'area_registry_updated');

    const collection = getCollection(
        conn,
        '_areas',
        fetchAreaRegistry,
        subscribeUpdates
    );
    collection.subscribe(cb);
}

export function subscribeDeviceRegistry(
    conn: Connection,
    cb: (state: HassDevices) => void
): void {
    const fetchDeviceRegistry = (conn: Connection) =>
        conn.sendMessagePromise<HassDevices>({
            type: 'config/device_registry/list',
        });

    const subscribeUpdates = (conn: Connection, store: Store<HassDevices>) =>
        conn.subscribeEvents(async () => {
            const devices = await fetchDeviceRegistry(conn);
            store.setState(devices, true);
        }, 'device_registry_updated');

    const collection = getCollection(
        conn,
        '_devices',
        fetchDeviceRegistry,
        subscribeUpdates
    );
    collection.subscribe(cb);
}

export function subscribeEntityRegistry(
    conn: Connection,
    cb: (state: HassEntityRegistryEntry[]) => void
): void {
    const fetchEntityRegistry = (conn: Connection) =>
        conn.sendMessagePromise<HassEntityRegistryEntry[]>({
            type: 'config/entity_registry/list',
        });

    const subscribeUpdates = (
        conn: Connection,
        store: Store<HassEntityRegistryEntry[]>
    ) =>
        conn.subscribeEvents(async () => {
            const devices = await fetchEntityRegistry(conn);
            store.setState(devices, true);
        }, 'entity_registry_updated');

    const collection = getCollection(
        conn,
        '_entity',
        fetchEntityRegistry,
        subscribeUpdates
    );
    collection.subscribe(cb);
}
