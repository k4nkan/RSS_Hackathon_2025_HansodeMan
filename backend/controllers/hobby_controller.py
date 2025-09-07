from flask import request, jsonify
from models.realtimeDB_access import DBAccess
from controllers.home_controller import home

def add_hobby(data):
    user_id = DBAccess.write_hobby(data)
    return jsonify({"user_id": user_id})