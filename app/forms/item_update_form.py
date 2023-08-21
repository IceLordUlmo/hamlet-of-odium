from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField

class ItemUpdateForm(FlaskForm):
    inventoryItemId = IntegerField('inventoryItemId')
    name = StringField('name')
    description = StringField('description')
