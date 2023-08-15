from .db import db, add_prefix_for_prod, environment, SCHEMA

class Location(db.Model):
    __tablename__ = 'locations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    required_level = db.Column(db.Integer)
    description = db.Column(db.String(255))
    image_url = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "name": self.name,
            "image_url": self.image_url,
            "required_level" : self.required_level
        }
