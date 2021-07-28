from sqlalchemy.orm import relationship
from .db import db


class Chatroom(db.Model):
    __tablename__ = 'chatrooms'

    id = db.Column(db.Integer, primary_key=True)
    meeting_id = db.Column(db.Integer, db.ForeignKey(
        'meetings.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    meeting = relationship('Meeting', backref='chatroom', uselist=False)
    messages = relationship('Message', lazy='joined',
                            back_populates='chatroom',
                            cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'meeting_id': self.meeting_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'meeting': self.meeting.to_dict(),
            'messages': self.messages.to_dict()
        }
