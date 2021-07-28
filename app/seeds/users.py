from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name='User', moderator=True, email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', first_name='Marnie', last_name='User', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', first_name='Bobbie', last_name='User', email='bobbie@aa.io', password='password')
    homer = User(
        username='homer', first_name='Homer', last_name='Simpson', email='homer@aa.io', password='password')
    marge = User(
        username='marge', first_name='Marge', last_name='Simpson', email='marge@aa.io', password='password')
    bart = User(
        username='bart', first_name='Bart', last_name='Simpson', email='bart@aa.io', password='password')
    lisa = User(
        username='lisa', first_name='Lisa', last_name='Simpson', email='lisa@aa.io', password='password')
    maggie = User(
        username='maggie', first_name='Maggie', last_name='Simpson', email='maggie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(homer)
    db.session.add(marge)
    db.session.add(bart)
    db.session.add(lisa)
    db.session.add(maggie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
