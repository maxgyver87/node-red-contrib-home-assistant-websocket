# Entity Config

Home Assistant entity config

## Configuration

### Name

- Type: `string`

The name of the entity that will show in Node-RED

### Device

- Type: `string`
- [device config documentation](./device-config.md)

A list of devices the entity can be associated with. This is used to group entities together in the UI.

::: warning Caveat
If the entity has already been registered with Home Assistant when no device was selected. The device will not be added to the Home Assistant until after Home Assistant has been restarted.
:::

### Type <Badge text="required"/>

- Type: `string`
- Values: `binary_sensor|button|sensor|switch`

### Resend state and attributes

- Type: `boolean`

When the entity in Home Assistant is created the state and attributes will also be set. This is only applicable with certain entities nodes.

### Other Properties

Configuration options are available for the selected entities

[https://developers.home-assistant.io/docs/core/entity](https://developers.home-assistant.io/docs/core/entity)
