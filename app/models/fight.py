from .db import db, add_prefix_for_prod, environment, SCHEMA

class Fight(db.Model):
    __tablename__ = 'fights'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')))
        monster_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('monsters.id')))
        monster_hp = db.Column(db.Integer)
        
    def to_dict(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "description": self.description,
            "name": self.name
        }
