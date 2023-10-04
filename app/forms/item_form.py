from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField

class ItemForm(FlaskForm):
    quantity = IntegerField('quantity')
    itemId = IntegerField('itemId')
