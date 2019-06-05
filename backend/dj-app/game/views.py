from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

def index(request):
    return render(request, 'game/index.html', {})

def room(request, room_name):
    return render(request, 'game/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name))
    })

def newGame(request):
    return render(request, 'game/gameWindow.html', {})