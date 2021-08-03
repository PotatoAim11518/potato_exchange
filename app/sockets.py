from flask_socketio import SocketIO, send
from . import app

socket_io = SocketIO(app)
