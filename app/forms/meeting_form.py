from flask_wtf import FlaskForm
from wtforms.fields.core import IntegerField, StringField
from wtforms.fields.simple import SubmitField
from wtforms.validators import Length, ValidationError, NumberRange, DataRequired
from app.models import Meeting


def meeting_exists(form, field):
    name = field.data
    meeting = Meeting.query.filter(Meeting.name == name).first()
    if meeting:
        raise ValidationError('A meeting by this name already exists')


def already_hosting(form, field):
    host_id = field.data
    host = Meeting.query.filter(Meeting.host_id == host_id).first()
    if host:
        raise ValidationError('You can only host one meeting at a time')


class MeetingForm(FlaskForm):
    host_id = IntegerField('Host ID', validators=[DataRequired(), already_hosting])
    name = StringField('Name', validators=[DataRequired(), meeting_exists, Length(
        min=2, max=64, message="Please enter a name up to 64 characters long")])
    description = StringField('Description', validators=[DataRequired(), Length(
        min=1, max=1000, message="Please enter a description up to 1000 characters long")])
    queue_limit = IntegerField('Queue Size', validators=[DataRequired(), NumberRange(
        min=1, max=25, message="Please enter a queue size between 1 and 25")])
    submit = SubmitField("Host")


class MeetingEditForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(
        min=2, max=64, message="Please enter a name up to 64 characters long")])
    description = StringField('Description', validators=[DataRequired(), Length(
        min=1, max=1000, message="Please enter a description up to 1000 characters long")])
    queue_limit = IntegerField('Queue Size', validators=[DataRequired(), NumberRange(
        min=1, max=25, message="Please enter a queue size between 1 and 25")])
