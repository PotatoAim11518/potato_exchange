from flask import Blueprint;
from app.models import Meeting
from app.forms import meeting_form

meeting_routes = Blueprint('meetings', __name__)


@meeting_routes.route('/')
def meetings():
    meetings = Meeting.query.all()
    return {'meetings': [meeting.to_dict() for meeting in meetings]}


@meeting_routes.route('/<int:id>')
def meeting(id):
    meeting = Meeting.query.get(id)
    return meeting.to_dict()


# @meeting_routes.route('/', methods=["POST"])
# def addMeeting():
#     meeting = Meeting.query

# @meeting_routes.route('/', methods=["PATCH"])

# @meeting_routes.route('/<int:id>', methods=["DELETE"])
