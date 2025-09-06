from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_bp
from controllers.home_controller import home_bp

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000", "https://your-frontend.com"])
    app.register_blueprint(user_bp)
    app.register_blueprint(home_bp)
    return app