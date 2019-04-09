import subprocess
import os
import time


class BrokerComponent:

    def __init__(self):
        print("Broker initiating")
        self.start()

    def quit(self):
        self.script.kill()
        print("Broker shutdown")


    def start(self):
        cmd = ["/usr/local/sbin/mosquitto", "-c", "/usr/local/etc/mosquitto/mosquitto.conf"]
        self.script = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
        print("Broker started")
        #output = self.script.communicate()[0]


broker = BrokerComponent()
