from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_recipes():
    demo1 = Recipe(
        name='Test recipe one'
        )
    
    db.session.add(demo1)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))
        
    db.session.commit()