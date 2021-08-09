# Potato Exchange

## [potatoexchange.herokuapp.com]

---
## About
Potato Exchange is a platform loosely based off of [Turnip Exchange], an app for [Animal Crossing: New Horizons] players to post their island codes to allow other people to enter their islands via a queueing system. In ACNH, the goal is to exchange a fungible good (Turnips) for in-game currency (Bells) at the highest possible price. Potato Exchange's goal is to allow users to have small, personal virtual meet-and-greets with lobby hosts using a similar queueing system, but also adds a chatroom feature to be able to socialize with other fans in queue.

---

## Wiki Pages
### [Feature List]
### [Database Schema]
### [Frontend Routes]
### [User Stories]
<!-- ### [API Routes] -->
---
### Redux Tree
  - Session: the session user
  - Meetings: list of hosted meetings
  - Messages: stored chat messages
  - Queue: joins of users and the meetings to which they are queued

---
## Technologies
### Libraries used:
- [Flask](https://flask.palletsprojects.com/)
- [React.js](https://reactjs.org/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Alembic](https://alembic.sqlalchemy.org/en/latest/)
- [PostgreSQL](https://www.postgresql.org/)
- [Flask-WTForms](https://flask-wtf.readthedocs.io/)
- [SocketIO](https://socket.io/)
- [Flask-SocketIO](https://flask-socketio.readthedocs.io/en/latest/)
- [Gunicorn](https://gunicorn.org/)
- [eventlet](https://eventlet.net/)
- [lorem-text](https://pypi.org/project/lorem-text/)

### Deployment:
- [Heroku](https://www.heroku.com/)
- [Docker](https://www.docker.com/)

### Testing:
- [Postman](https://www.postman.com/)
- [Postbird](https://github.com/Paxa/postbird)

---
## App Features
### Homepage
Guests are greeted with a minimalistic homepage where they can jump right into hosting a meeting, joining an existing one, and user login/signup. The "?" has other information about me and my other projects.

### Joining Meetings
Available meetings are listed as summary cards. Queue saturation should update in real-time thanks to SocketIO. The "Host" card presents another opportunity for the user to host a meeting.

### Guest Meetings and Chat
Inside a meeting room, a regular user can see meeting details on the left, with a live chatroom on the right. Usernames are color-coded by self, host, and other users. You can also Join or Leave a meeting's queue as long as it's not locked.

### Meeting Management as the Host
As the Host, you're presented with an array of options: editing meeting information, locking and unlocking the queue, and closing the meeting.

You can also manage the queue by kicking individual users, or the patron first in line by clicking "Next Guest".

Relevant actions have confirmation dialogues to prevent accidents.

All these actions update live on other clients.


---
## Components

[Turnip Exchange]: https://turnip.exchange/

[potatoexchange.herokuapp.com]: https://potatoexchange.herokuapp.com

[Animal Crossing: New Horizons]: https://www.animal-crossing.com/new-horizons/

[Feature List]: https://github.com/PotatoAim11518/potato_exchange/wiki/MVP-Feature-List

[Database Schema]: https://github.com/PotatoAim11518/potato_exchange/wiki/Database-Schema

[Frontend Routes]: https://github.com/PotatoAim11518/potato_exchange/wiki/Frontend-Routes

[User Stories]: https://github.com/PotatoAim11518/potato_exchange/wiki/User-Stories

[API Documentation]: ./api-documentation
