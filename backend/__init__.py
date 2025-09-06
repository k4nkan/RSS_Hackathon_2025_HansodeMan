from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_bp
from models.realtimeDB_access import initialize_firebase

def create_app():
    initialize_firebase()
    app = Flask(__name__)
    CORS(app, origins=["https://news2talk.vercel.app"])
    app.register_blueprint(user_bp)
    return app
