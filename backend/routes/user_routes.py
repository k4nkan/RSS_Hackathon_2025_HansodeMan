from flask import Blueprint, request, jsonify
from controllers.user_controller import add_user

user_bp = Blueprint("user", __name__, url_prefix="/users")

@user_bp.route("/create_user", methods=["POST"])
def create_user():
    data = request.json
    new_user_id = add_user(data)
    return jsonify({"message": "User created successfully", "userId": new_user_id}), 201

@user_bp.route("/home", methods=["GET"])
def test_home():
    return jsonify({
        "id": "1",
        "url": "https://qiita.com/yudeouji",
        "title": "test",
        "content": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    })