from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from . import views                            # add this
from django.conf.urls import url
from .api import RegistrationAPI, LoginAPI, UserAPI

urlpatterns = [
    path('washingmachine/', views.WashingMachineView.as_view({'get': 'list','post': 'create'})),
    path("register/", RegistrationAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("user/", UserAPI.as_view()),
]