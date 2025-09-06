from flask import Blueprint, request, jsonify
from controllers.entry import add_user
from controllers.login_controller import login

user_bp = Blueprint("user", __name__, url_prefix="/users")

@user_bp.route("/create_user", methods=["POST"])
def create_user():
    data = request.json
    new_user_id = add_user(data)
    return jsonify({"message": "User created successfully", "userId": new_user_id}), 201

@user_bp.route("/login", methods=["POST"])
def login_route():
    return login()
