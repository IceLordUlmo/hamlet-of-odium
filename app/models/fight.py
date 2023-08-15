from .db import db, add_prefix_for_prod, environment, SCHEMA

class Fight(db.Model):
    __tablename__ = 'fights'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    monster_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('monsters.id')))
    monster_hp = db.Column(db.Integer)
        
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "monster_id": self.monster_id,
            "monster_hp": self.monster_hp
        }
