import os
import json

from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, login_required
from flask_socketio import SocketIO, send, emit

from .models import db, User, Message
from .forms import MessageForm
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.meeting_routes import meeting_routes
from .api.message_routes import message_routes

from .seeds import seed_commands

from .config import Config


app = Flask(__name__)
socket_io = SocketIO(app)

if __name__ == '__main__':
    socket_io.run(app)

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


# Sockets


@socket_io.on('connect')
def test_connect():
    emit('my response', {'data': 'Connected'})


# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f'{field} : {error}')
#     return errorMessages


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
        # new_message = Message.query.filter(Message.user_id == user_id, Message.meeting_id == id).order_by(
        #     Message.created_at.desc()).first()
        data = json.dumps(message.to_dict(), default=str)
        emit('incoming_message', data, broadcast=True)
    else:
        emit('incoming_errors', ["Message must be up to 255 characters long"])
