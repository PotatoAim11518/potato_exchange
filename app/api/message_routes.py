from flask import Blueprint
from app.models import Message
from flask_login import login_required
from app.models import db, Message


message_routes = Blueprint('messages', __name__)


@message_routes.route('/')
def messages():
    messages = Message.query.all()
