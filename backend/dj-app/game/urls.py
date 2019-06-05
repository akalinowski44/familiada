from django.conf.urls import url

from . import views

urlpatterns = [

    url('newgame', views.newGame, name='newGame')
]



