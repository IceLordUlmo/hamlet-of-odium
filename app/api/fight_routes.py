from flask import Blueprint, jsonify, session, request
from app.models import User, Fight, Monster, db
from flask_login import current_user, login_required
from app.forms import DamageForm

fight_routes = Blueprint('fight_routes', __name__)

@fight_routes.route('/start/<int:monsterId>')
@login_required
def start_fight(monsterId):
    inFight = Fight.query.filter(Fight.user_id == current_user.id).first()
    if inFight:
        return {'error': 'fight already exists'}
    monster = Monster.query.filter(Monster.id == monsterId).first()
    fight = Fight(user_id = current_user.id, monster_id = monsterId, monster_hp = monster.max_hp)
    db.session.add(fight)
    db.session.commit()
    return fight.to_dict()

@fight_routes.route('')
@login_required
def get_fight():
    
    fight = Fight.query.filter(Fight.user_id == current_user.id).first()
    if not fight:
        return { 'status':'no fight' }
    
    return fight.to_dict()

@fight_routes.route('/attack', methods=['POST'])
@login_required
def damage_monster():

    form = DamageForm()
    response = {}

    damage = form['damage'].data
    fight = Fight.query.filter(Fight.user_id == current_user.id).first()
    monster = Monster.query.filter(Monster.id == fight.monster_id).first()
    if damage >= fight.monster_hp:
        
        
        response['ramen'] = monster.ramen
        response['experience'] = monster.experience
        response['type'] = 'victory'
        print('viccy roy ----------------------------------------------------(((((())))))')
        current_user.ramen = current_user.ramen + monster.ramen
        current_user.experience = current_user.experience + monster.experience
        db.session.delete(fight)
        db.session.commit()
        return response
    else:
        fight.monster_hp = fight.monster_hp - damage
        db.session.commit()
        response['type'] = 'hit'
        response['monster_hp'] = fight.monster_hp
        return response