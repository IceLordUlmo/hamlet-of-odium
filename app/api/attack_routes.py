from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Attack, User, UserAttack, db
from app.forms import AttackForm

attack_routes = Blueprint('attacks', __name__)


@attack_routes.route('')
@login_required
def trainable_attacks():
    attackList = []

    attacks = Attack.query.all()
    
    for attack in attacks:
        attackList.append(attack.to_dict())
    
    return attackList

@attack_routes.route('/learned')
@login_required
def learned_attacks():
    attackList = []

    attacks = UserAttack.query.all()
    
    for attack in attacks:
        attackList.append(attack.to_dict())
    
    return attackList


@attack_routes.route('/train', methods=['POST'])
@login_required
def train_attack():
    form = AttackForm()
    attackId = form['attackId'].data
    attack = Attack.query.filter(Attack.id == attackId).first()
    

    if current_user.ramen >= attack.ramen_cost:
        userAttack = UserAttack(name = attack.name, 
                                description= attack.description, 
                                user_id = current_user.id,
                                attack_id= attack.id,
                                damage= attack.damage
                                )
        db.session.add(userAttack)
        db.session.commit()
        response = userAttack.to_dict()
        return response
    return {'error' : 'error while training attack'}