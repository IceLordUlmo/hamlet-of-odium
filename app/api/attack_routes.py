from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Attack, User, UserAttack, db
from app.forms import AttackForm, AttackUpdateForm, AttackDeleteForm

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
        if attack.user_id == current_user.id:
            attackList.append(attack.to_dict())
    
    return attackList


@attack_routes.route('/train', methods=['POST'])
@login_required
def train_attack():
    form = AttackForm()
    attackId = form['attackId'].data
    attack = Attack.query.filter(Attack.id == attackId).first()
    name = form['name'].data
    description = form['description'].data

    if current_user.ramen >= attack.ramen_cost:
        userAttack = UserAttack(name = name, 
                                description= description, 
                                user_id = current_user.id,
                                attack_id= attack.id,
                                damage= attack.damage
                                )
        db.session.add(userAttack)
        db.session.commit()
        response = userAttack.to_dict()
        return response
    return {'error' : 'error while training attack'}

@attack_routes.route('/train', methods=['PUT'])
@login_required
def update_attack():
    form = AttackUpdateForm()
    userAttackId = form['userAttackId'].data
    userAttack = UserAttack.query.filter(UserAttack.id == userAttackId).first()
    if (userAttack.user_id != current_user.id):
        return {'error' : 'That attack does not belong to you.'}, 403
    
    name = form['name'].data
    description = form['description'].data
    
    userAttack.name =  name
    userAttack.description = description

    db.session.add(userAttack)
    db.session.commit()
    response = userAttack.to_dict()
    return response

@attack_routes.route('/train', methods=['DELETE'])
@login_required
def delete_user_attack():
    form = AttackDeleteForm()
    userAttackId = form['userAttackId'].data

    userAttack = UserAttack.query.filter(UserAttack.id == userAttackId).first()

    db.session.delete(userAttack)
    db.session.commit()
    return {'status': 'Attack deletion successful.'}