from app.models import db, Encounter, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_encounters():
    demo1 = Encounter(
        name='Rat Fight', 
        location_id = 1, 
        image_url='encounterSeedUrl1.jpg', 
        description = 'Fight one rat',
        fight_monster_id = 1,
        reward_item_id = 1)

    demo2 = Encounter(
        name='Never Gonna Give You Up', 
        location_id = 1, 
        image_url='encounterSeedUrl2.jpg', 
        description = 'Battle versus Rick Astley',
        fight_monster_id = 2)
    demo3 = Encounter(
        name='Mine some Iron', 
        location_id = 2, 
        image_url='encounterSeedUrl3.jpg', 
        description = 'You swing your pick and mine some iron.',
        reward_item_id = 2)
    demo4 = Encounter(
        name='Mine some Coal', 
        location_id = 2, 
        image_url='encounterSeedUrl4.jpg', 
        description = 'You spot some coal and declare it mine.',
        reward_item_id = 3)
    demo5 = Encounter(
        name='Delve too Deep', 
        location_id = 2, 
        image_url='encounterSeedUrl5.jpg', 
        description = 'A Balrog',
        fight_monster_id = 3)
    demo6 = Encounter(
        name='Attack the Darkness', 
        location_id = 3, 
        image_url='encounterSeedUrl6.jpg', 
        description = 'You cast magic missile. Nothing happens.')
    demo7 = Encounter(
        name='Beeswax gone wrong', 
        location_id = 3, 
        image_url='encounterSeedUrl7.jpg', 
        description = 'Fight a MadCandle',
        fight_monster_id = 4)
    demo8 = Encounter(
        name='Forbidden Encounter', 
        location_id = 4, 
        image_url='nogozone.jpg', 
        description = 'Should not be able to see this',
        fight_monster_id = 5,
        reward_item_id = 4)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
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