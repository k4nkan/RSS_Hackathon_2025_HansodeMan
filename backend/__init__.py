from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_bp

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["https://news2talk.vercel.app"])
    app.register_blueprint(user_bp)
    return app