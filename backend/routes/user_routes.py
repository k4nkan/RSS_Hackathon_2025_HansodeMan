from flask import Blueprint, request, jsonify
from controllers.entry import add_user
from controllers.login_controller import login
from controllers.detail_controller import handle_detail
from controllers.hobby_controller import add_hobby
from controllers.home_controller import home

user_bp = Blueprint("user", __name__, url_prefix="/users")

@user_bp.route("/create_user", methods=["POST"])
def create_user():
    data = request.json
    new_user_id = add_user(data)
    return jsonify({"message": "User created successfully", "userId": new_user_id}), 201

@user_bp.route("/hobby", methods=["POST"])
def hobby():
    data = request.json
    return add_hobby(data)

@user_bp.route("/login", methods=["POST"])
def login_route():
    return login()

@user_bp.route("/home", methods=["GET"])
def home_route():
    data = request.json
    username = data.get('user_id')
    return home(username)

@user_bp.route("/detail", methods=["POST"])
def detail_route():
    data = request.json
    return handle_detail(data)
   