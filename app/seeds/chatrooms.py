from app.models import db, Chatroom


# Adds a demo user, you can add other chatrooms here if you want
def seed_chatrooms():
    simpsons = Chatroom(meeting_id=1)
    bartman = Chatroom(meeting_id=2)
    maggie = Chatroom(meeting_id=3)

    db.session.add(simpsons)
    db.session.add(bartman)
    db.session.add(maggie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the chatrooms table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_chatrooms():
    db.session.execute('TRUNCATE chatrooms RESTART IDENTITY CASCADE;')
    db.session.commit()
