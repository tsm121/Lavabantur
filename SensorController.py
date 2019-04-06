import stmpy, threading
from sense_hat import SenseHat


class SensorController:
    # Class properties
    
    sensor_threshold = 1.5 

    # Transitions
    t_init = {'source' : 'initial',
            'target' : 's_idle',
            'effect' : 'on_init'}

    t_timer = {'trigger' : 'timer',
                'source' : 's_idle',
                'target' : 's_idle',
                'effect' : 'on_timer'}
    
    # States

    s_idle = {'name' : 's_idle',
            'entry' : 'start_timer("timer", 1000)'}

    # Actions

    def on_init(self):
        print("on_init")
        
    def on_timer(self):
        acc=self.sensor.get_accelerometer_raw()
        x=acc['x']
        y=acc['y']
        z=acc['z']
        
        if (x**2 + y**2 + z**2)**(1/2) > SensorController.sensor_threshold:
            if self.last_state != 'on':
                self.mqtt_client.publish("sensor", "{sensor:" +str(self.sensor_id) + ", state: on}")
                self.last_state = 'on'
        else:
            if self.last_state != 'off':
                self.mqtt_client.publish("sensor", "{sensor:" +str(self.sensor_id) + ", state: off}")
                self.last_state = 'off'
                
    def __init__(self, sensor_id, sensor):
        self.sensor = sensor
        self.sensor_id = sensor_id
        self.last_state = ''
        print("Creating Sensor Controller for Sensor ID " + str(self.sensor_id))
        self.stm = stmpy.Machine(transitions=[SensorController.t_init, SensorController.t_timer], obj=self, name=str(self.sensor_id), states=[SensorController.s_idle])

if __name__ == "__main__":
    sensor_id = 1
    sensor = SenseHat()
    sensor_controller = SensorController(sensor_id, sensor)

    driver = stmpy.Driver()
    driver.add_machine(sensor_controller.stm)
    print(driver.print_status())
    
    driver.start(max_transitions=5)
