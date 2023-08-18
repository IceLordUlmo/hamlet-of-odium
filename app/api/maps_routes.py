from flask import Blueprint, jsonify, session, request
from app.models import User, Location, Encounter, db
from flask_login import current_user, login_required

maps_routes = Blueprint('maps', __name__)

@maps_routes.route('')
@login_required
def load_maps():
    locationList = []
    encounterList = []

    locations = Location.query.all()
    encounters = Encounter.query.all()

    for location in locations:
        locationList.append(location.to_dict())
    for encounter in encounters:
        encounterList.append(encounter.to_dict())

    response = {}
    response['locations'] = locationList
    response['encounters'] = encounterList
    return response