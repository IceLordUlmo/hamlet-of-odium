from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField

class AttackForm(FlaskForm):
    attackId = IntegerField('attackId')
    name = StringField('name')
    description = StringField('description')