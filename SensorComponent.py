from SensorController import SensorController
import stmpy
import paho.mqtt.client as mqtt
import sys, getopt, threading
from sense_hat import SenseHat

class SensorComponent:

    def on_connect(self, client, userdata, flags, rc):
        print('on_connect(): {}'.format(mqtt.connack_string(rc)))

    def on_message(self, client, userdata, msg):
        print(threading.get_ident())
        print('on_message(): topic: {}'.format(msg.topic))

    def __init__(self, broker_ip, broker_port):
        self.broker_ip = broker_ip
        self.broker_port = broker_port
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.on_connect = self.on_connect
        self.mqtt_client.on_message = self.on_message
        
        self.driver = stmpy.Driver()
    
    def add_sensor(self, sensor_id, sensor):
        sensor_controller = SensorController(sensor_id, sensor)

        sensor_controller.mqtt_client = self.mqtt_client

        self.driver.add_machine(sensor_controller.stm)

    def start(self):
        print('MQTT: Connecting to {}:{}'.format(self.broker_ip, self.broker_port))
        self.mqtt_client.connect(self.broker_ip, self.broker_port)
        self.driver.start()

        try:
            self.mqtt_client.loop_forever()
        except KeyboardInterrupt:
            print('Interrupted')
            self.stop()            

    def stop(self):
        self.driver.stop()
        self.mqtt_client.disconnect()

def help():
    print("Options: -h --help -b --broker-ip -p --port")
    print("Usage: SensorComponent.py [option] [argument]")

def parse_args(sysargs):
    try:
        opts, args = getopt.getopt(sysargs,"hb:p:", ["help", "broker-ip=", "--port"])
        if len(opts) == 0 and len(args) == 0:
            raise getopt.GetoptError("no argument given")
        for opt, arg in opts:
            if opt in ('-h', '--help'):
                help()
            elif opt in ('-b', '--broker-ip'):
                broker_ip = arg
            elif opt in ('-p', '--port'):
                port = arg
    except getopt.GetoptError as e:
        print(e)
        help()
        sys.exit(2)

    try:
        return (broker_ip, port)
    except UnboundLocalError as e:
        print(e)
        help()
        sys.exit(2)

if __name__ == "__main__":
    broker_ip, port = parse_args(sys.argv[1:])
    try:
        sensor_component = SensorComponent(str(broker_ip), int(port))
        sensehat = SenseHat()
        sensor_component.add_sensor(1, sensehat)
        sensor_component.start()
    except Exception as e:
        print(e)
        sys.exit(2)
    
    
    #sensor_component.add_sensor(sensor_id=1) # Add sensehat as second input param. This add_sensor method makes SensorComponent scalable because we could use a service discovery to add all sensors connected to the Raspberry pi
    #sensor_component.start()
    #sensor_component.stop()