from app.models import db, RecipeIngredient, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_recipeingredients():
    demo1 = RecipeIngredient(
        quantity=3,
        item_id = 1,
        recipe_id = 1
        )
    demo2 = RecipeIngredient(
        quantity=2,
        item_id = 2,
        recipe_id = 1
        )
    demo3 = RecipeIngredient(
        quantity=1,
        item_id = 3,
        recipe_id = 1
        )
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_recipeingredients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipeingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipeingredients"))
        
    db.session.commit()