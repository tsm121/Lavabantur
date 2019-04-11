from django.contrib import admin

from .models import WashingMachineBookings

class WachingMachineAdmin(admin.ModelAdmin):
    list_display = ('washing_machine', 'start_time', 'end_time', 'used')


admin.site.register(WashingMachineBookings, WachingMachineAdmin)

