from .db import db, add_prefix_for_prod, environment, SCHEMA

class Monster(db.Model):
    __tablename__ = 'monsters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    max_hp = db.Column(db.Integer)
    damage = db.Column(db.Integer)
    ramen = db.Column(db.Integer)
    experience = db.Column(db.Integer)
    image_url = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "max_hp": self.max_hp,
            "damage": self.damage,
            "ramen": self.ramen,
            "experience": self.experience,
            "image_url": self.image_url
        }
