from flask_wtf import FlaskForm
from wtforms import IntegerField

class ItemForm(FlaskForm):
    quantity = IntegerField('quantity')