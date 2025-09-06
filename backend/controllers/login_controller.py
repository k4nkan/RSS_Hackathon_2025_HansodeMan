from flask import request, jsonify
from models.realtimeDB_access import DBAccess
from controllers.home_controller import home

def login():
    data = request.get_json()
    username = data.get('user')
    password = data.get('pass')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    auth_result = DBAccess.authenticate_user(username, password)

    if auth_result:
        return home(username)
    else:
        return jsonify({"error": "Invalid username or password"}), 401
