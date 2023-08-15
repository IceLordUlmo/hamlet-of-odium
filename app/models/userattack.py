from .db import db, add_prefix_for_prod, environment, SCHEMA

class UserAttack(db.Model):
    __tablename__ = 'user_attacks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    damage = db.Column(db.Integer)
    description = db.Column(db.String(255))
    attack_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('attacks.id')))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "attack_id": self.attack_id,
            "damage": self.damage,
            "description": self.description
        }
