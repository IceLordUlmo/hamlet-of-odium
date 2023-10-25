from flask import Blueprint, jsonify, session, request
from app.models import User, Recipe, db
from flask_login import current_user, login_required

recipes_routes = Blueprint('recipes', __name__)

@recipes_routes.route('')
@login_required
def load_recipes():
    recipeList = []

    recipes = Recipe.query.all()

    for recipe in recipes:
        recipeList.append(recipe.to_dict())

    response = {}
    response['recipes'] = recipeList
    return response