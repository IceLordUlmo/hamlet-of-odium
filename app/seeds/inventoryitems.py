from app.models import db, InventoryItem, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_inventoryitems():
    demo = InventoryItem(
        name='Seeded Inventory Item 1 for User 1',
        description = 'the original item already in inventory',
        image_url = 'seededItemUrl.jpg',
        quantity = 3,
        user_id = 1)

    db.session.add(demo)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_inventoryitems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.inventory_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM inventory_items"))
        
    db.session.commit()