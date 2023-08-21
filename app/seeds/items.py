from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_items():
    demo1 = Item(
        name = 'Rat Tail',
        description = 'the tail of a rat',
        image_url = 'seedItem1.jpg',
        ramen_cost = 1
    )
    demo2 = Item(
        name = 'Iron Ore',
        description = 'rock with iron embedded in it',
        image_url = 'seedItem1.jpg',
        ramen_cost = 23
    )
    demo3 = Item(
        name = 'Coal',
        description = 'a lump of coal, no presents for you',
        image_url = 'seedItem1.jpg',
        ramen_cost = 19
    )
    demo4 = Item(
        name = 'Diamond-encrusted Snacks',
        description = 'expensive is the point',
        image_url = 'seedItem1.jpg',
        ramen_cost = 9999
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
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))
        
    db.session.commit()