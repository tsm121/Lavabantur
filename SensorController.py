import stmpy, threading


class SensorController:
    # Class properties

    sensor_treshhold = 1.5 

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
        print("on_timer")

    def __init__(self, sensor_id, sensor):
        print("Creating Sensor Controller for Sensor ID " + str(sensor_id))
        
        self.stm = stmpy.Machine(transitions=[SensorController.t_init, SensorController.t_timer], obj=self, name=str(sensor_id), states=[SensorController.s_idle])

if __name__ == "__main__":
    sensor_id = 1
    sensor = 0
    sensor_controller = SensorController(sensor_id, sensor)

    driver = stmpy.Driver()
    driver.add_machine(sensor_controller.stm)
    print(driver.print_status())
    
    driver.start(max_transitions=5)
