from app.models import db, Meeting


# Adds a demo user, you can add other meetings here if you want
def seed_meetings():
    simpsons = Meeting(host_id=4, name='Simpson Residence', description='Welcome to the home of the most famous family in Springfield!', queue_limit='25')
    bartman = Meeting(host_id=6, name='Bart\'s Treehouse', description='No girls allowed. No bullies allowed. Milhouse ok.', queue_limit='2')
    maggie = Meeting(host_id=8, name='Maggie\'s Crib', description='*Baby noises* *Baby noises* *Baby noises*', queue_limit='2')

    db.session.add(simpsons)
    db.session.add(bartman)
    db.session.add(maggie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the meetings table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_meetings():
    db.session.execute('TRUNCATE meetings RESTART IDENTITY CASCADE;')
    db.session.commit()
