from flask import Blueprint
from app.models import db, Queue

queue_routes = Blueprint('queues', __name__)


@queue_routes.route('', methods=["GET"])
def queues():
    queues = Queue.query.all()
    return {'queues': [queue.to_dict() for queue in queues]}


@queue_routes.route('/<int:id>', methods=["GET"])
def queue(id):
    queue = Queue.query.get_or_404(id)
    return queue.to_dict()
