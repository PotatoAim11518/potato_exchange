from flask_wtf import FlaskForm
from wtforms.fields.core import IntegerField, StringField
from wtforms.validators import Length, ValidationError, NumberRange, DataRequired;
from app.models import Meeting

def meeting_exists(form, field):
    name = field.data
    meeting = Meeting.query.filter(Meeting.name == name).first()
    if meeting:
        raise ValidationError('A meeting by this name already exists')

class MeetingForm(FlaskForm):
    name = StringField('Name', validators=[meeting_exists, DataRequired(), Length(min=2, max=64, message="Please enter a name up to 64 characters long")])
    description = StringField('Description', validators=[DataRequired(), Length(min=1, max=1000, message="Please enter a description up to 1000 characters long")])
    queue_limit = IntegerField('Queue Size', validators=[DataRequired(), NumberRange(min=1, max=25, message="Please enter a queue size between 1 and 25")])
