from flask import Blueprint, jsonify, session, request
from app.models import User, Fight, Monster, db
from flask_login import current_user, login_required

monster_routes = Blueprint('monster_routes', __name__)

@monster_routes.route('')
@login_required
def get_monsters():
    monsterList = []
    
    monsters = Monster.query.all()

    for monster in monsters:
        monsterList.append(monster.to_dict())

    return monsterList