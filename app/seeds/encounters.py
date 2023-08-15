from app.models import db, Encounter, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_encounters():
    demo = Encounter(
        name='Seed Encounter 1', 
        location_id = 1, 
        image_url='encounterSeedUrl.jpg', 
        description = 'The first seeded encounter',
        fight_monster_id = 1,
        reward_item_id = 1)

    db.session.add(demo)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_encounters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.encounters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM encounters"))
        
    db.session.commit()