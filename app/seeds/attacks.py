from app.models import db, Attack, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_attacks():
    demo = Attack(
        username='Attackname', email='demo@aa.io', password='password')

    db.session.add(demo)
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