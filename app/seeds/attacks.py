from app.models import db, Attack, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_attacks():
    demo1 = Attack(
        name='Basic Attack',
        image_url = 'nullSeedData1.jpg',
        description = 'Punch',
        ramen_cost = 2,
        damage = 1
    )
    demo2 = Attack(
        name='Energy Blast',
        image_url = 'nullSeedData2.jpg',
        description = 'Magical Attack',
        ramen_cost = 22,
        damage = 4
    )
    demo3 = Attack(
        name='Hammer Time',
        image_url = 'nullSeedData3.jpg',
        description = 'Cannot touch this.',
        ramen_cost = 403,
        damage = 16
    )
    demo4 = Attack(
        name='Final Getsuga Tensho',
        image_url = 'nullSeedData4.jpg',
        description = 'An ultimate attack.',
        ramen_cost = 7580,
        damage = 301
    )
    
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_attacks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.attacks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM attacks"))
        
    db.session.commit()