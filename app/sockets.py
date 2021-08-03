from flask_socketio import SocketIO, send

from . import app
from .models import db, Message

socket_io = SocketIO(app)

if __name__ == '__init__':
    socket_io.run(app)


@socket_io.on('message')
def handleMessage(msg):
    print("Message: ", msg)

    message = Message(message=msg)
    db.session.add(message)
    db.session.commit()

    send(msg, broadcast=True)
