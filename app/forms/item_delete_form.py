from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField

class ItemDeleteForm(FlaskForm):
    inventoryItemId = IntegerField('inventoryItemId')