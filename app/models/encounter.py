from .db import db, add_prefix_for_prod, environment, SCHEMA

class Encounter(db.Model):
    __tablename__ = 'encounters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(255), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('locations.id')), nullable = False)
    image_url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    fight_monster_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('monsters.id')))
    reward_item_id = db.Column(db.Integer , db.ForeignKey(add_prefix_for_prod('items.id')))
        
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location_id": self.location_id,
            "image_url": self.image_url,
            "description": self.description,
            "fight_monster_id": self.fight_monster_id,
            "reward_item_id": self.reward_item_id
        }
