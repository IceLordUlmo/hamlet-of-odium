from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Attack

attack_routes = Blueprint('attacks', __name__)


@user_routes.route('/')
@login_required
def attacks():
    """
    Query for all attacks and returns them in a list of user dictionaries
    """
    attacks = Attack.query.all()
    return {'attacks': [attack.to_dict() for attack in attacks]}


@user_routes.route('/<int:id>')
@login_required
def attack(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    attack = Attack.query.get(id)
    return attack.to_dict()