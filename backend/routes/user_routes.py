from flask import Blueprint, request, jsonify
from controllers.entry import add_user
from controllers.login_controller import login
from controllers.detail_controller import handle_detail

user_bp = Blueprint("user", __name__, url_prefix="/users")

@user_bp.route("/create_user", methods=["POST"])
def create_user():
    data = request.json
    new_user_id = add_user(data)
    return jsonify({"message": "User created successfully", "userId": new_user_id}), 201

@user_bp.route("/login", methods=["POST"])
def login_route():
    return login()

@user_bp.route("/detail", methods=["POST"])
def detail_route():
    processed_result = handle_detail()
    return jsonify({
        "message": "Detail processed successfully",
        "result": processed_result
    }), 200