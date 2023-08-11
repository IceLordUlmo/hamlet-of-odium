from .db import db, add_prefix_for_prod, environment, SCHEMA

class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

        id = db.Column(db.Integer, primary_key=True)
        name= db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "description": self.description,
            "name": self.name
        }
