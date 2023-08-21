from flask_wtf import FlaskForm
from wtforms import IntegerField

class AttackDeleteForm(FlaskForm):
    userAttackId = IntegerField('userAttackId')
