from .db import db, add_prefix_for_prod, environment, SCHEMA

class Attack(db.Model):
    __tablename__ = 'attacks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    ramen_cost = db.Column(db.Integer, nullable=False)
    damage = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url,
            "description": self.description,
            "ramen_cost": self.ramen_cost,
            "damage": self.damage
        }
