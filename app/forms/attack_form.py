from flask_wtf import FlaskForm
from wtforms import IntegerField

class AttackForm(FlaskForm):
    attackId = IntegerField('attackId')