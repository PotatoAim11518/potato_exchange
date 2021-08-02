from sqlalchemy.orm import relationship
from .db import db

queues = db.Table('queues', db.Model.metadata,
                  db.Column('user_id', db.Integer, db.ForeignKey(
                      'users.id'), primary_key=True),
                  db.Column('meeting_id', db.Integer, db.ForeignKey(
                      'meetings.id'), primary_key=True)
                  )


class Meeting(db.Model):
    __tablename__ = 'meetings'

    id = db.Column(db.Integer, primary_key=True)
    host_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False, unique=True)
    name = db.Column(db.String(64), nullable=False, unique=True)
    description = db.Column(db.String(1000), nullable=False)
    queue_limit = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=db.func.now(), onupdate=db.func.now())

    host = relationship('User',
                        back_populates='meeting', lazy='joined', innerjoin=True)
    queue = relationship('User', secondary='queues', back_populates='meeting')
    message = relationship(
        'Message', back_populates='meeting', lazy='joined', innerjoin=True, cascade='all, delete-orphan')
    # chatroom = relationship(
    #     'Chatroom', back_populates='meeting', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'host_id': self.host_id,
            'name': self.name,
            'description': self.description,
            'queue_limit': self.queue_limit,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'host': self.host and self.host.to_dict(),
            'message': self.message and self.message.to_dict()
        }
