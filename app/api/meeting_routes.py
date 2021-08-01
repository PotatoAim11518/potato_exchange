from flask import Blueprint, request
from app.models import Meeting
from app.models import db
from app.forms import MeetingForm, MeetingEditForm
from flask_login import current_user, login_required

meeting_routes = Blueprint('meetings', __name__)


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
            'name': form['name'].data,
            'description': form['description'].data,
            'queue_limit': form['queue_limit'].data,
        }
        Meeting.query.filter(Meeting.id == id).update(data)
        db.session.commit()
        updated_meeting = Meeting.query.filter(Meeting.id == id).first()
        return updated_meeting.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@meeting_routes.route('/<int:id>/end', methods=["DELETE"])
@login_required
def end_meeting(id):
    meeting = Meeting.query.filter(Meeting.id == id,
                                   Meeting.host_id == current_user.id).first()
    deleted_meeting = meeting.to_dict()
    if meeting:
        Meeting.query.filter(Meeting.id == id).delete(synchronize_session=False)
        db.session.commit()
        return deleted_meeting
    else:
        return {'errors': ['No meeting found.']}
