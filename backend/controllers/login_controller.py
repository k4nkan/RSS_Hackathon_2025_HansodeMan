from flask import request, jsonify
from models.realtimeDB_access import UserDB

def login():
    data = request.get_json()
    username = data.get('user')
    password = data.get('pass')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    users = UserDB.get_all()
    if not users:
        return jsonify({"error": "Invalid username or password"}), 401

    for user_id, user_data in users.items():
        # データベースにuser_dataが存在し、かつuserとpassキーが存在するかチェック
        if user_data and 'user' in user_data and 'pass' in user_data:
            if user_data['user'] == username and user_data['pass'] == password:
                return jsonify({
                    "message": "Login successful",
                    "user_id": user_id,
                    "username": user_data.get('user')
                }), 200

    return jsonify({"error": "Invalid username or password"}), 401