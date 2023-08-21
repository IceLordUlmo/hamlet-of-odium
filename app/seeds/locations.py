from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_locations():
    demo1 = Location(
        name = 'The Gently Rolling Plains',
        description = "A good place to start adventuring.",
        required_level = 1,
        image_url = "seedLocation1.jpg"
        )
    demo2 = Location(
        name = "It's Not Yours It's Mine",
        description = "Ores and other minerals.",
        required_level = 1,
        image_url = "seedLocation2.jpg"
        )
    demo3 = Location(
        name = 'Arena',
        description = "Why does everything have to have an arena?",
        required_level = 2,
        image_url = "seedLocation3.jpg"
        )
    demo4 = Location(
        name = 'The Forbidden Archives',
        description = "If you can get in here, I'm not even mad.",
        required_level = 999,
        image_url = "seedLocation4.jpg"
        )
    demo5 = Location(
        name = 'The Forbidden Archives 2',
        description = "If you can get in here, I'm not even mad.",
        required_level = 999,
        image_url = "seedLocation5.jpg"
        )
    demo6 = Location(
        name = 'The Forbidden Archives 3',
        description = "If you can get in here, I'm not even mad.",
        required_level = 999,
        image_url = "seedLocation6.jpg"
        )
    demo7 = Location(
        name = 'The Less Forbidden Archives',
        description = "Not as secret as the others...",
        required_level = 3,
        image_url = "seedLocation7.jpg"
        )
    demo8 = Location(
        name = 'The Forbidden Archives',
        description = "If you can get in here, I'm not even mad.",
        required_level = 999,
        image_url = "seedLocation8.jpg"
        )
    demo9 = Location(
        name = 'The Forbidden Archives',
        description = "If you can get in here, I'm not even mad.",
        required_level = 999,
        image_url = "seedLocation9.jpg"
        )
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_locations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM locations"))
        
    db.session.commit()