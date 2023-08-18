from app.models import db, Monster, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_monsters():
    demo1 = Monster(
        name='Rat',
        description='Rat of unusual size',
        max_hp = 5,
        damage = 1,
        ramen = 3,
        experience = 4,
        image_url = 'monster1.jpg'
        )
    demo2 = Monster(
        name='Rick Astley',
        description="He's never gonna give you up",
        max_hp = 1,
        damage = 0,
        ramen = 2,
        experience = 2,
        image_url = 'monster2.jpg'
        )
    demo3 = Monster(
        name='Balrog',
        description='A huge shadow. In the middle of the shadow is the shape of a fierce-looking man.',
        max_hp = 7,
        damage = 2,
        ramen = 4,
        experience = 5,
        image_url = 'monster3.jpg'
        )
    demo4 = Monster(
        name='Madcandle',
        description='Is it angry at you or at being a sentient candle? Yes.',
        max_hp = 15,
        damage = 3,
        ramen = 7,
        experience = 9,
        image_url = 'monster4.jpg'
        )
    demo5 = Monster(
        name='[redacted]',
        description='for to the bidden',
        max_hp = 999,
        damage = 999,
        ramen = 777,
        experience = 9999,
        image_url = 'monster5.jpg'
        )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_monsters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.monsters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM monsters"))
        
    db.session.commit()