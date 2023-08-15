from .db import db, add_prefix_for_prod, environment, SCHEMA

class Equipment(db.Model):
    __tablename__ = 'equipment'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    slot = db.Column(db.String(255), nullable=False)
    damage = db.Column(db.Integer)
    armor = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
            "slot": self.slot,
            "damage": self.damage,
            "armor": self.armor,
            "user_id": self.user_id
        }
