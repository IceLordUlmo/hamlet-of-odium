from .db import db, add_prefix_for_prod, environment, SCHEMA
from .recipeingredient import RecipeIngredient

class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        ingredients = RecipeIngredient.query.filter_by(recipe_id = self.id)
        ingredientlist = []
        for ing in ingredients:
            ingredientlist.append(ing.to_dict())
        return {
            "id": self.id,
            "name": self.name,
            "ingredients": ingredientlist
        }
