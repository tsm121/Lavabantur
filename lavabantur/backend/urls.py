from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from . import views                            # add this
from django.conf.urls import url


urlpatterns = [
    path('admin/', admin.site.urls),
    path('washingmachine/', views.WashingMachineView.as_view({'get': 'list','post': 'create'})),

]