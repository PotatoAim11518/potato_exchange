from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length


class MessageForm(FlaskForm):
    user_id = IntegerField("UserID", validators=[DataRequired()])
    meeting_id = IntegerField("MeetingID", validators=[DataRequired()])
    message = StringField("Message", validators=[DataRequired(), Length(min=1, max=255, message="Please enter a message up to 255 characters long")])
    submit = SubmitField("Send")
