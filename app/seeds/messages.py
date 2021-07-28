from app.models import db, Message
from lorem_text import lorem

# Adds a demo user, you can add other messages here if you want
def seed_messages():
    simpsons_0 = Message(user_id=4, chatroom_id=1, message=lorem.words(7))
    simpsons_1 = Message(user_id=3, chatroom_id=1, message=lorem.words(7))
    simpsons_2 = Message(user_id=1, chatroom_id=1, message=lorem.words(7))
    simpsons_3 = Message(user_id=2, chatroom_id=1, message=lorem.words(7))
    simpsons_4 = Message(user_id=7, chatroom_id=1, message=lorem.words(7))
    simpsons_5 = Message(user_id=5, chatroom_id=1, message=lorem.words(7))
    simpsons_6 = Message(user_id=7, chatroom_id=1, message=lorem.words(7))
    simpsons_7 = Message(user_id=8, chatroom_id=1, message=lorem.words(7))
    simpsons_8 = Message(user_id=6, chatroom_id=1, message=lorem.words(7))
    simpsons_9 = Message(user_id=4, chatroom_id=1, message=lorem.words(7))

    bartman_0 = Message(user_id=2, chatroom_id=2, message=lorem.words(7))
    bartman_1 = Message(user_id=2, chatroom_id=2, message=lorem.words(7))
    bartman_2 = Message(user_id=1, chatroom_id=2, message=lorem.words(7))
    bartman_3 = Message(user_id=2, chatroom_id=2, message=lorem.words(7))
    bartman_4 = Message(user_id=3, chatroom_id=2, message=lorem.words(7))
    bartman_5 = Message(user_id=4, chatroom_id=2, message=lorem.words(7))
    bartman_6 = Message(user_id=5, chatroom_id=2, message=lorem.words(7))
    bartman_7 = Message(user_id=6, chatroom_id=2, message=lorem.words(7))
    bartman_8 = Message(user_id=7, chatroom_id=2, message=lorem.words(7))
    bartman_9 = Message(user_id=8, chatroom_id=2, message=lorem.words(7))

    maggie_0 = Message(user_id=7, chatroom_id=3, message=lorem.words(7))
    maggie_1 = Message(user_id=1, chatroom_id=3, message=lorem.words(7))
    maggie_2 = Message(user_id=2, chatroom_id=3, message=lorem.words(7))
    maggie_3 = Message(user_id=8, chatroom_id=3, message=lorem.words(7))
    maggie_4 = Message(user_id=2, chatroom_id=3, message=lorem.words(7))
    maggie_5 = Message(user_id=7, chatroom_id=3, message=lorem.words(7))
    maggie_6 = Message(user_id=3, chatroom_id=3, message=lorem.words(7))
    maggie_7 = Message(user_id=6, chatroom_id=3, message=lorem.words(7))
    maggie_8 = Message(user_id=4, chatroom_id=3, message=lorem.words(7))
    maggie_9 = Message(user_id=5, chatroom_id=3, message=lorem.words(7))

    db.session.add(simpsons_0)
    db.session.add(simpsons_1)
    db.session.add(simpsons_2)
    db.session.add(simpsons_3)
    db.session.add(simpsons_4)
    db.session.add(simpsons_5)
    db.session.add(simpsons_6)
    db.session.add(simpsons_7)
    db.session.add(simpsons_8)
    db.session.add(simpsons_9)
    db.session.add(bartman_0)
    db.session.add(bartman_1)
    db.session.add(bartman_2)
    db.session.add(bartman_3)
    db.session.add(bartman_4)
    db.session.add(bartman_5)
    db.session.add(bartman_6)
    db.session.add(bartman_7)
    db.session.add(bartman_8)
    db.session.add(bartman_9)
    db.session.add(maggie_0)
    db.session.add(maggie_1)
    db.session.add(maggie_2)
    db.session.add(maggie_3)
    db.session.add(maggie_4)
    db.session.add(maggie_5)
    db.session.add(maggie_6)
    db.session.add(maggie_7)
    db.session.add(maggie_8)
    db.session.add(maggie_9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the messages table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
