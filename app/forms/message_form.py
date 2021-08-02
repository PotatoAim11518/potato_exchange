from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import validators
from wtforms.fields.simple import SubmitField
from wtforms.validators import DataRequired, Length


class MessageForm(FlaskForm):
    message = StringField("Message", validators=[DataRequired(), Length(min=1, max=255, message="Please enter a message up to 255 characters long")])
    submit = SubmitField("Send")
