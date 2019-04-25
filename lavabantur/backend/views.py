from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets  # add this
from .serializers import SerializerWashingMachine  # add this
from .models import WashingMachineBookings  # add this


class WashingMachineView(viewsets.ModelViewSet):  # add this
    serializer_class = SerializerWashingMachine  # add this
    queryset = WashingMachineBookings.objects.all()  # add this

