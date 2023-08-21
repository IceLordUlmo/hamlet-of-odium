from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField

class AttackUpdateForm(FlaskForm):
    userAttackId = IntegerField('userAttackId')
    name = StringField('name')
    description = StringField('description')