from flask import request, jsonify
from models.realtimeDB_access import DBAccess
from controllers.home_controller import home
import logging

# ログ設定
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def login():
    data = request.get_json()
    username = data.get('user')
    password = data.get('pass')

    logger.info(f"data確認: user_id={data}")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    auth_result = DBAccess.authenticate_user(username, password)

    logger.info(f"ユーザーID: user_id={username}")

    if auth_result:
        return jsonify({"user_id": username})
    else:
        return jsonify({"error": "Invalid username or password"}), 401
