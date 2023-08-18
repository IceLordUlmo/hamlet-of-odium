from flask import Blueprint, jsonify, session, request
from app.models import User, Item, InventoryItem, db
from flask_login import current_user, login_required
from app.forms import ItemForm

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

@item_routes.route('/<int:itemId>/buy', methods=['POST'])
@login_required
def buy_item(itemId):
    item = Item.query.filter(Item.id == itemId).first()

    form = ItemForm()

    quantity = form['quantity'].data

    if current_user.ramen >= (item.ramen_cost * quantity):
        current_user.ramen = current_user.ramen - (item.ramen_cost * quantity)

        inventoryEntry = InventoryItem.query.filter(InventoryItem.name == item.name).first()

        if inventoryEntry:
            if inventoryEntry.quantity + quantity > -1:
                inventoryEntry.quantity = inventoryEntry.quantity + quantity
                if inventoryEntry.quantity == 0:
                    db.session.delete(inventoryEntry)
                    db.session.commit()
                    return { 'result' : 'Item entry removed' }
            else:
                response = { 'error' : "Cannot change quantity in that way"}
                return response
        else:
            inventoryEntry = InventoryItem(name = item.name, description = item.description, image_url = item.image_url, quantity = quantity, user_id = current_user.id)
            db.session.add(inventoryEntry)
        db.session.commit()
        response = inventoryEntry.to_dict()
    else:
        response = { 'error' : "Cannot afford"}
    return response