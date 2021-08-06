from flask import Blueprint, request
from sqlalchemy.orm import session
from app.models import db, Meeting, Message, Queue
from app.forms import MeetingForm, MeetingEditForm, MessageForm
from flask_login import current_user, login_required
from .message_routes import message_routes
from .queue_routes import queue_routes

meeting_routes = Blueprint('meetings', __name__)
meeting_routes.register_blueprint(message_routes)
meeting_routes.register_blueprint(queue_routes)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@meeting_routes.route('')
def meetings():
    meetings = Meeting.query.all()
    return {'meetings': [meeting.to_dict() for meeting in meetings]}


@meeting_routes.route('/<int:id>')
def meeting(id):
    meeting = Meeting.query.get_or_404(id)
    return meeting.to_dict()



@meeting_routes.route('/host', methods=["POST"])
@login_required
def host_meeting():
    """
    Creates a new meeting
    """
    form = MeetingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        meeting = Meeting(
            host_id=form['host_id'].data,
            name=form['name'].data,
            description=form['description'].data,
            queue_limit=form['queue_limit'].data
        )
        db.session.add(meeting)
        db.session.commit()
        new_meeting = Meeting.query.filter(Meeting.host_id == current_user.id).first()
        return new_meeting.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@meeting_routes.route('/<int:id>/update', methods=["PATCH"])
@login_required
def edit_meeting(id):
    form = MeetingEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = {
            'host_id': form['host_id'].data,
            'name': form['name'].data,
            'description': form['description'].data,
            'queue_limit': form['queue_limit'].data,
        }
        Meeting.query.filter(Meeting.id == id).update(data, synchronize_session=False)
        db.session.commit()
        updated_meeting = Meeting.query.filter(Meeting.id == id).first()
        return updated_meeting.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@meeting_routes.route('/<int:id>/end', methods=["DELETE"])
@login_required
def end_meeting(id):
    meeting = Meeting.query.filter(Meeting.id == id,
                                   Meeting.host_id == current_user.id).first()
    if meeting:
        db.session.delete(meeting)
        db.session.commit()
        return meeting.to_dict()
    else:
        return {'errors': ['No meeting found.']}

# get messages for this meeting


@meeting_routes.route('/<int:id>/messages')
def meeting_messages(id):
    messages = Message.query.filter(Message.meeting_id == id).all()
    return {'meeting_messages': [message.to_dict() for message in messages]}

# send message to meeting


@meeting_routes.route('/<int:id>/messages/send', methods=["POST"])
@login_required
def send_message(id):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message(
            user_id=form['user_id'].data,
            meeting_id=id,
            message=form['message'].data
        )
        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# get a single meeting's queue list

@meeting_routes.route('/<int:meeting_id>/queue', methods=["GET"])
def getQueue(meeting_id):
    queues = Queue.query.filter(Queue.meeting_id == meeting_id).all()
    if not queues:
        return {'errors': ['Queue is empty']}
    return {'queues': [queue.to_dict() for queue in queues] }


# join meeting's queue

@meeting_routes.route('/<int:meeting_id>/join', methods=["PUT"])
@login_required
def joinQueue(meeting_id):
    queue = Queue.query.filter(Queue.meeting_id == meeting_id, Queue.user_id == current_user.id).first()
    if not queue:
        add_to_queue = Queue(
            user_id=current_user.id,
            meeting_id=meeting_id
        )
        db.session.add(add_to_queue)
        db.session.commit()
        return queue.to_dict()
    else:
        return {'errors': ["Already in queue for this meeting."]}


# lock queue by setting queue limit to 0

@meeting_routes.route('/<int:meeting_id>/lock', methods=["PATCH"])
@login_required
def lockQueue(meeting_id):
    # queue = Queue.query.filter(Queue.meeting_id == meeting_id).first()
    meeting = Meeting.query.get(meeting_id)
    meeting_dict = meeting.to_dict()
    if current_user.id == meeting_dict['host_id']:
        Meeting.query.get(meeting_id).update({Meeting.queue_limit: 0}, synchronize_session=False)
        db.session.commit()
        meeting = Meeting.query.get(meeting_id)
        return meeting.to_dict()
    else:
        return {'errors': ["You are not the meeting host."]}


# leave a meeting's queue

@meeting_routes.route('/<int:meeting_id>/leave', methods=["DELETE"])
@login_required
def leaveQueue(meeting_id):
    queue = Queue.query.filter(Queue.meeting_id == meeting_id, Queue.user_id == current_user.id).first()
    if queue:
        db.session.delete(queue)
        db.session.commit()
        return queue.to_dict()
    else:
        return {'errors': ['You\'re no longer in queue.']}


# kick someone from a meeting's queue


@meeting_routes.route('/<int:meeting_id>/kick/<int:user_id>', methods=["DELETE"])
@login_required
def leaveQueue(meeting_id, user_id):
    queue = Queue.query.filter(Queue.meeting_id == meeting_id, Queue.user_id == user_id).first()
    # TO DO: add check if the current user is the meeting host
    if queue:
        db.session.delete(queue)
        db.session.commit()
        return queue.to_dict()
    else:
        return {'errors': ['User no longer in queue.']}
