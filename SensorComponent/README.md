# How to use

This component must run on a Raspberry Pi with a connected SenseHat board.

To run the sensor component, type in bash

```bash
python3 SensorComponent.py -b <mqtt-broker-ip> -p <mqtt-broker-port>
```

This will start the component, and connects to a MQTT broker at a given address. The component will publish messages on the topic "sensor" when a change in state occurs i.e. when the pi is shaken or at rest.

To test this component from e.g. Linux run (given Mosquitto broker operational on the _same_ computer)

```bash
mosquitto_sub -A <loopback ip> -t sensor
```

This will print the published messages from the PI to your terminal. Try to shake the PI!!!

