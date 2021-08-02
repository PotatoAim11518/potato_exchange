from sqlalchemy.orm import backref, relationship
from .db import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    meeting_id = db.Column(db.Integer, db.ForeignKey(
        'meetings.id'), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    user = relationship('User', backref='messages')
    meeting = relationship('Meeting', back_populates='messages', uselist=False)
    # chatroom = relationship('Chatroom', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'meeting_id': self.meeting_id,
            'message': self.message,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict(),
            'meeting': self.meeting.to_dict()
            # 'chatroom': self.chatroom.to_dict()
        }
