from flask_wtf import FlaskForm
from wtforms import IntegerField

class DamageForm(FlaskForm):
    damage = IntegerField('damage')