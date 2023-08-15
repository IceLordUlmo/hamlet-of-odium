from .db import db, add_prefix_for_prod, environment, SCHEMA

class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image_url": self.image_url,
            "quantity": self.quantity,
            "user_id": self.user_id
        }
