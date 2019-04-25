from .models import WashingMachineBookings
from rest_framework import serializers

class SerializerWashingMachine(serializers.ModelSerializer):
    class Meta:
        model = WashingMachineBookings
        fields = ("washing_machine", "start_time", "end_time", "used")