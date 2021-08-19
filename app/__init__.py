import os
import json
import eventlet

from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, login_required, current_user
from flask_socketio import SocketIO, send, emit

from .models import db, User, Message, Queue, Meeting
from .forms import MessageForm
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.meeting_routes import meeting_routes
from .api.message_routes import message_routes
from .api.queue_routes import queue_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)
app.debug = 'DEBUG' in os.environ
socket_io = SocketIO(app, engineio_logger=True, cors_allowed_origins=['https://potatoexchange.herokuapp.com', 'http://potatoexchange.herokuapp.com', 'http://localhost:5000'])


# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(meeting_routes, url_prefix='/api/meetings')
app.register_blueprint(message_routes, url_prefix='/api/messages')
app.register_blueprint(queue_routes, url_prefix='/api/queues')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


# Create Namespace Here


# Chat Sockets
@socket_io.on('connect')
def test_connect():
    emit('my response', {'data': 'Connected'})


@socket_io.on('client_message')
# @login_required
def receive_message(user_id, id, message):
    if len(message) in range(1, 256):
        message = Message(
            user_id=user_id,
            meeting_id=id,
            message=message
        )
        db.session.add(message)
        db.session.commit()
        data = json.dumps(message.to_dict(), default=str)
        emit('incoming_message', data, broadcast=True)
    else:
        emit('incoming_errors', ["Message must be up to 255 characters long"])


# Queue sockets
@socket_io.on('join_request')
def add_to_queue(user_id, meeting_id):
    queue = Queue.query.filter(Queue.user_id == user_id).first()
    # Queue.meeting_id == meeting_id,
    if queue:
        message = "Already queued to a meeting."
        return emit('already_queued', (user_id, meeting_id, message))
    else:
        add_to_queue = Queue(
            user_id=user_id,
            meeting_id=meeting_id
        )
        db.session.add(add_to_queue)
        db.session.commit()
        emit('update_queue', meeting_id, broadcast=True)


@socket_io.on('leave_request')
def remove_from_queue(user_id, meeting_id):
    queue = Queue.query.filter(Queue.meeting_id == meeting_id, Queue.user_id == user_id).first()
    queue_dict = queue.to_dict()
    if queue:
        db.session.delete(queue)
        db.session.commit()
        queue_dict = json.dumps(queue.to_dict(), default=str)
        emit('trim_queue', (queue_dict), broadcast=True)


@socket_io.on('kick_user')
def kick_from_queue(user_id, meeting_id):
    queue = Queue.query.filter(Queue.meeting_id == meeting_id, Queue.user_id == user_id).first()
    if queue:
        db.session.delete(queue)
        db.session.commit()
        queue_dict = json.dumps(queue.to_dict(), default=str)
        emit('trim_queue', (queue_dict), broadcast=True)


@socket_io.on('next_user')
def kick_from_queue(user_id, meeting_id):
    queue = Queue.query.filter(Queue.meeting_id == meeting_id, Queue.user_id == user_id).first()
    if queue:
        db.session.delete(queue)
        db.session.commit()
        queue_dict = json.dumps(queue.to_dict(), default=str)
        emit('trim_queue', (queue_dict), broadcast=True)


@socket_io.on('lock_queue')
def lock_queue(user_id, meeting_id):
    meeting = Meeting.query.get(meeting_id)
    meeting_dict = meeting.to_dict()
    if user_id == meeting_dict['host_id']:
        Meeting.query.filter(Meeting.id == meeting_id).update({Meeting.queue_limit: 0}, synchronize_session=False)
        db.session.commit()
        emit('update_meeting', meeting_id, broadcast=True)


@socket_io.on('unlock_queue')
def unlock_queue(user_id, meeting_id, queue_limit):
    meeting = Meeting.query.get(meeting_id)
    meeting_dict = meeting.to_dict()
    if user_id == meeting_dict['host_id']:
        Meeting.query.filter(Meeting.id == meeting_id).update({Meeting.queue_limit: queue_limit}, synchronize_session=False)
        db.session.commit()
        emit('update_meeting', meeting_id, broadcast=True)


# Meeting sockets
@socket_io.on('edit')
def edit_meeting(meeting_id):
    emit('update_meeting', meeting_id, broadcast=True)


@socket_io.on('end_meeting')
def end_meeting(meeting_id, user_id):
    meeting = Meeting.query.filter(Meeting.id == meeting_id,
                                   Meeting.host_id == user_id).first()
    if meeting:
        db.session.delete(meeting)
        db.session.commit()
        emit('clear_meeting', broadcast=True)


if __name__ == '__main__':
    socket_io.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
