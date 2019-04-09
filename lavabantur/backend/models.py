from django.db import models


class WashingMachineBookings(models.Model):
    #Use automatic id created by django
    washing_machine = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    used = models.BooleanField(default=False)

    def __str__(self):
        return '{0}, {1}, {2}'.format(self.washing_machine, self.start_time, self.end_time)
