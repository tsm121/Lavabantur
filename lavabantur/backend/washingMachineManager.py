import paho.mqtt.client as mqtt
import stmpy
import logging
import json
from threading import Thread
import json
#from models import WashingMachineBookings
from django.utils import timezone
from datetime import date, datetime, timedelta

# Proper MQTT broker address
MQTT_BROKER = '10.0.0.119'
MQTT_PORT = 1883

# Proper topics for communication
MQTT_TOPIC_INPUT = 'sensor/#'#'ttm4115/command'
#MQTT_TOPIC_OUTPUT = 'sensor/update_state'#'ttm4115/answer'


class TimerLogic:
    """
    State Machine for a named timer.

    This is the support object for a state machine that models a single timer.
    """

    def __init__(self, name, component):
        self._logger = logging.getLogger(__name__)
        self.name = name
        self.component = component

        # Transitions
        t0 = {'source': 'initial',
              'target': 'check_status'}

        t1 = {'trigger': 't',
              'source': 'error',
              'target': 'check_status'}

        t2 = {'trigger': 'error',
              'source': 'check_status',
              'target': 'error'}

        t3 = {'trigger': 'timeout',
              'source': 'booked',
              'target': 'check_status'}

        t4 = {'trigger': 'isAvailable',
              'source': 'check_status',
              'target': 'available'}

        t5 = {'trigger': 'isBusy',
              'source': 'check_status',
              'target': 'busy'}

        t6 = {'trigger': 'isBooked',
              'source': 'check_status',
              'target': 'booked'}

        t7 = {'trigger': 'booked',
              'source': 'available',
              'target': 'booked'}

        t8 = {'trigger': 'error',
              'source': 'available',
              'target': 'error'}

        t9 = {'trigger': 'in_use',
              'source': 'available',
              'target': 'busy'}

        t10 = {'trigger': 'error',
               'source': 'busy',
               'target': 'error'}

        t11 = {'trigger': 'available',
               'source': 'busy',
               'target': 'check_status'}

        t12 = {'trigger': 'in_use',
               'source': 'booked',
               'target': 'busy'}

        t13 = {'trigger': 'error',
               'source': 'booked',
               'target': 'error'}

        #States
        check_status = {'name': 'check_status',
                        'entry': 'get_status'}

        error = {'name': 'error',
                 'entry': 'send_msg("error")',
                 'entry': 'set_timer("t", 5000)'}

        available = {'name': 'available'}

        busy = {'name': 'busy',
                'entry': 'send_msg("started")'}

        booked = {'name': 'booked',
                  'entry': 'set_timer("timeout", 5000)'}


        self.stm = stmpy.Machine(name=name, transitions=[t0, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13], obj=self, states = [check_status, error, available, busy, booked])


    #Functions
    def get_status(self):
        self.component.get_status(self)

    def send_msg(self, msg):
        self.component.send_msg(self, msg)



    #Functions from TimerLogic
    """def started(self):
        # Start timer
        self.stm.start_timer('timer', self.duration)

        # Publish that timer has started with publish
        self.component.mqtt_client.publish('ttm4115/answer', self.name + " timer started with the duration: " + self.format_time(self.duration) + ".")

    def report_status(self):

        # Get timer status
        remaining_time = self.stm.get_timer('timer')

        # Report status
        self.component.mqtt_client.publish('ttm4115/answer', self.name + " timer has " + self.format_time(remaining_time) + " left.")

    def timer_completed(self):

        # Report that timer is completed
        self.component.mqtt_client.publish('ttm4115/answer', self.name + " timer completed!")

    # Format milliseconds to hours, minutes and seconds
    def format_time(self, time):

        m, s = divmod((time/1000), 60)
        h, m = divmod(m, 60)

        if (h != 0):
            return (str(int(h)) + " hour(s), " + str(int(m)) + " minute(s), " + str(int(s)) + " second(s)" )
        elif(m != 0):
            return (str(int(m)) + " minute(s)," + str(int(s)) + " second(s)" )
        else:
            return (str(int(s)) + " second(s)" )"""

class TimerManagerComponent:
    """
    The component to manage named timers in a voice assistant.

    This component connects to an MQTT broker and listens to commands.
    To interact with the component, do the following:

    * Connect to the same broker as the component. You find the broker address
    in the value of the variable `MQTT_BROKER`.
    * Subscribe to the topic in variable `MQTT_TOPIC_OUTPUT`. On this topic, the
    component sends its answers.
    * Send the messages listed below to the topic in variable `MQTT_TOPIC_INPUT`.

        {"command": "new_timer", "name": "spaghetti", "duration":50}

        {"command": "status_all_timers"}

        {"command": "status_single_timer", "name": "spaghetti"}

    """
    error = []


    #sjekk status i database
    def get_status(self, wm_stm):
        """
        sensor = wm_stm.name
        bookings = list(WashingMachineBookings.objects.filter(washing_machine = int(sensor)))
        if (wm_stm.name in error):
            wm.send_signal('error')
            return
        for booking in bookings:
            if(booking.start_time <= datetime.now() and booking.end_time >= datetime.now()):
                if (booking.used):
                    wm_stm.send_signal('isBusy')
                else:
                    wm_stm.send_signal('isBooked')
                return
        """
        wm_stm.stm.send('isAvailable')


    #Sjekk status i stms

    def fetch_status(self, wm_id):
        if wm_id is None:
            dic = {}
            s = []
            for stm_id in self.stm_driver._stms_by_id:
                machine = {}
                machine['id'] = stm_id
                stm = self.stm_driver._stms_by_id[stm_id]
                machine['status'] = stm.state
                s.append(machine)
            dic['stms'] = s
            report = json.dumps(dic)

            # Send/display status
            print(dic)
            return dic

        else:
            # Get timer/stm name
            stm_id = payload.get('sensor')
            stm = self.stm_driver._stms_by_id[stm_id]

            # Send/display status
            print(stm.state)
            return stm.state

    #Lag entry i database
    def send_msg(self, wm_stm, msg):
        """
        if msg == "started":
            sensor = wm_stm.name
            bookings = list(WashingMachineBookings.objects.filter(washing_machine = int(sensor)))
            for booking in bookings:
                if(booking.start_time <= datetime.now() and booking.end_time >= datetime.now()):
                    #WashingMachineBookings.objects.filter(washing_machine = int(sensor)).filter(start_time = booking.start_time).update(used = True)
                    return
            booking = WashingMachineBookings(washing_machine = int(sensor), start_time = datetime.now(), end_time = datetime.now() + timedelta(hours=3), used = True)
            booking.save()
        elif msg == "error":
            self.error.append(wm_stm.name)
        """
        return

    def on_connect(self, client, userdata, flags, rc):
        # we just log that we are connected
        self._logger.debug('MQTT connected to {}'.format(client))

    def on_message(self, client, userdata, msg):
        """
        Processes incoming MQTT messages.

        We assume the payload of all received MQTT messages is an UTF-8 encoded
        string, which is formatted as a JSON object. The JSON object contains
        a field called `command` which identifies what the message should achieve.

        As a reaction to a received message, we can for example do the following:

        * create a new state machine instance to handle the incoming messages,
        * route the message to an existing state machine session,
        * handle the message right here,
        * throw the message away.

        """
        self._logger.debug('Incoming message to topic {}'.format(msg.topic))

        try:
            # Unwrapping json message
            payload = json.loads(msg.payload.decode("utf-8"))

            # Get command message
            command = payload.get('command')

            # Command for generating a new timer
            if msg.topic == 'sensor/update_state':#(command == 'update_state'):
                stm_id = int(payload.get("sensor"))
                stm = self.stm_driver._stms_by_id[stm_id]
                state = payload.get("state")
                stm.send(state)
                print("Updated state to {}".format(state))
                if stm_id in self.error:
                    self.error.remove(stm_id)


            elif msg.topic == 'sensor/new_stm':#(command == 'new_machine'):

                # Get timer/stm name and duration
                stm_id = int(payload.get('sensor'))

                # Generate a new state machine
                wm_stm = TimerLogic(stm_id, self)

                # Add timer/stm to driver
                self.stm_driver.add_machine(wm_stm.stm)
                print("Added new stm {}".format(stm_id))

        except Exception as err:
            self._logger.error('Message sent to topic {} had no valid JSON. Message ignored. {}'.format(msg.topic, err))
            return

    def __init__(self):
        """
        Start the component.

        ## Start of MQTT
        We subscribe to the topic(s) the component listens to.
        The client is available as variable `self.client` so that subscriptions
        may also be changed over time if necessary.

        The MQTT client reconnects in case of failures.

        ## State Machine driver
        We create a single state machine driver for STMPY. This should fit
        for most components. The driver is available from the variable
        `self.driver`. You can use it to send signals into specific state
        machines, for instance.

        """
        # get the logger object for the component
        self._logger = logging.getLogger(__name__)
        print('logging under name {}.'.format(__name__))
        self._logger.info('Starting Component')

        # create a new MQTT client
        self._logger.debug('Connecting to MQTT broker {} at port {}'.format(MQTT_BROKER, MQTT_PORT))
        self.mqtt_client = mqtt.Client()
        # callback methods
        self.mqtt_client.on_connect = self.on_connect
        self.mqtt_client.on_message = self.on_message
        # Connect to the broker
        self.mqtt_client.connect(MQTT_BROKER, MQTT_PORT)
        # subscribe to proper topic(s) of your choice
        self.mqtt_client.subscribe(MQTT_TOPIC_INPUT)
        # start the internal loop to process MQTT messages
        self.mqtt_client.loop_start()

        # we start the stmpy driver, without any state machines for now
        self.stm_driver = stmpy.Driver()
        self.stm_driver.start(keep_active=True)
        self._logger.debug('Component initialization finished')

    def stop(self):
        """
        Stop the component.
        """
        # stop the MQTT client
        self.mqtt_client.loop_stop()

        # stop the state machine Driver
        self.stm_driver.stop()

# logging.DEBUG: Most fine-grained logging, printing everything
# logging.INFO:  Only the most important informational log items
# logging.WARN:  Show only warnings and errors.
# logging.ERROR: Show only error messages.
debug_level = logging.DEBUG
logger = logging.getLogger(__name__)
logger.setLevel(debug_level)
ch = logging.StreamHandler()
ch.setLevel(debug_level)
formatter = logging.Formatter('%(asctime)s - %(name)-12s - %(levelname)-8s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)



t = TimerManagerComponent()

inn = ""
while inn != "ferdig":
    inn = input("Skriv inn noe")
    t.fetch_status(None)

