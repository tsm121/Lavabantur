from django.db import models
from django.contrib.auth.models import User

class WashingMachineBookings(models.Model):
    #Use automatic id created by django
    washing_machine = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    used = models.BooleanField(default=False)
    #user = models.ForeignKey(User, related_name="machine", on_delete=models.CASCADE, null=True)


    def __str__(self):
        return '{0}, {1}, {2}, {3}'.format(self.washing_machine, self.start_time, self.end_time, self.used)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user')

    def __str__(self):
        return self.user
