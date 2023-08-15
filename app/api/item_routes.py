from flask import Blueprint, jsonify, session, request
from app.models import User, Item, InventoryItem, db
from flask_login import current_user, login_required

item_routes = Blueprint('item', __name__)

@item_routes.route('')
@login_required
def item_list():
    itemList = []

    items = Item.query.all()

    for item in items:
        itemList.append(item.to_dict())
    
    return itemList

@item_routes.route('/inventory', methods=['GET'])
@login_required
def inventory_list():
    inventoryList = []

    items = InventoryItem.query.filter(InventoryItem.user_id == current_user.id)

    for item in items:
        inventoryList.append(item.to_dict())

    return inventoryList