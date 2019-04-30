from .models import WashingMachineBookings
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class SerializerWashingMachine(serializers.ModelSerializer):
    class Meta:
        model = WashingMachineBookings
        fields = ("washing_machine", "start_time", "end_time", "used")

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")