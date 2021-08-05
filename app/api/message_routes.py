from flask import Blueprint
from app.models import Message
from flask_login import login_required, current_user
from app.models import db, Message


message_routes = Blueprint('messages', __name__)


@message_routes.route('')
def messages():
    messages = Message.query.all()
    return {'messages': [message.to_dict() for message in messages]}


@message_routes.route('/<int:id>')
def message(id):
    message = Message.query.get_or_404(id)
    return message.to_dict()


@message_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def moderate_message(id):
    Message.query.get(id).update(
        {'message': "<< message removed by moderator >>"}, synchronize_session=False)
    db.session.commit()
    modded_message = Message.query.get(id)
    return modded_message.to_dict()


@message_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_message(id):
    message = Message.query.get(id)
    if message:
        db.session.delete(message)
        db.session.commit()
        return message.to_dict()
    else:
        return {'errors': ['No message found.']}
