from .db import db, add_prefix_for_prod, environment, SCHEMA

class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("recipe.id")))
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("item.id")))
    quantity = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "recipe_id": self.recipe_id,
            "item_id": self.item_id,
            "quantity": self.quantity
        }
