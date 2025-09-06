from flask import Blueprint, request, jsonify
from controllers.user_controller import fetch_user, add_user, fetch_all_users

user_bp = Blueprint("user", __name__, url_prefix="/users")

@user_bp.route("/<user_id>", methods=["GET"])
def get_user(user_id):
    user = fetch_user(user_id)
    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

@user_bp.route("/create_user", methods=["POST"])
def create_user():
    data = request.json
    add_user(data)
    return jsonify({"message": "User created"}), 201
