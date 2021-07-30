from flask import Blueprint
from flask.globals import request
from app.models import Meeting
from app.models import db
from app.forms import MeetingForm
from flask_login import current_user

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


@meeting_routes.route('/')
def meetings():
    meetings = Meeting.query.all()
    return {'meetings': [meeting.to_dict() for meeting in meetings]}


@meeting_routes.route('/<int:id>')
def meeting(id):
    meeting = Meeting.query.get(id)
    return meeting.to_dict()


@meeting_routes.route('/host', methods=["POST"])
def addMeeting():
    form = MeetingForm(request.form)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        meeting = Meeting(
            host_id=current_user.id,
            name=form['name'].data,
            description=form['description'].data,
            queue_limit=form['queue_limit'].data
        )
        db.session.add(meeting)
        db.session.commit()
        return meeting.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# @meeting_routes.route('/', methods=["PATCH"])

# @meeting_routes.route('/<int:id>', methods=["DELETE"])
