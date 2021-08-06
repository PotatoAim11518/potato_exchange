from sqlalchemy.orm import relationship
from .db import db


class Queue(db.Model):
    __tablename__ = 'queues'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    meeting_id = db.Column(db.Integer, db.ForeignKey('meetings.id'))
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    user = relationship('User', back_populates='queue', lazy='joined', innerjoin=True)
    meeting = relationship('Meeting', back_populates='queues', lazy='joined', innerjoin=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'meeting_id': self.meeting_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict(),
            'meeting': self.meeting.to_dict()
        }
