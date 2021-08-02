from flask.cli import AppGroup
from .users import seed_users, undo_users
from .meetings import seed_meetings, undo_meetings
# from .chatrooms import seed_chatrooms, undo_chatrooms
from .messages import seed_messages, undo_messages

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_meetings()
    # seed_chatrooms()
    seed_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_meetings()
    # undo_chatrooms()
    undo_messages()
    # Add other undo functions here
