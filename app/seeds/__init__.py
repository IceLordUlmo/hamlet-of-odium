from flask.cli import AppGroup
from .users import seed_users, undo_users

from .monsters import seed_monsters, undo_monsters
from .locations import seed_locations, undo_locations

from .encounters import seed_encounters, undo_encounters
from .attacks import seed_attacks, undo_attacks

from .items import seed_items, undo_items
from .inventoryitems import seed_inventoryitems, undo_inventoryitems

from .fights import seed_fights, undo_fights
from .equipment import seed_equipment, undo_equipment

from .userattacks import seed_userattacks, undo_userattacks

from .recipes import seed_recipes, undo_recipes
from .recipeingredients import seed_recipeingredients, undo_recipeingredients

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_recipeingredients()
        undo_recipes()
        undo_equipment()
        undo_fights()
        undo_userattacks()
        undo_inventoryitems()
        undo_items()
        undo_attacks()
        undo_encounters()
        undo_locations()
        undo_monsters()
        undo_users()
    seed_users()
    seed_items()
    seed_monsters()
    seed_locations()
    seed_encounters()
    seed_attacks()
    seed_recipes()
    seed_recipeingredients()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_recipeingredients()
    undo_recipes()
    undo_equipment()
    undo_fights()
    undo_userattacks()
    undo_inventoryitems()
    undo_items()
    undo_attacks()
    undo_encounters()
    undo_locations()
    undo_monsters()
    undo_users()
    # Add other undo functions here