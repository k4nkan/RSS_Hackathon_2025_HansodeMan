import logging
from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_bp
from models.realtimeDB_access import initialize_firebase

def create_app():
    logging.basicConfig(level=logging.INFO)
    logging.info("Starting create_app...")

    try:
        logging.info("Initializing Firebase...")
        initialize_firebase()
        logging.info("Firebase initialized successfully.")
    except Exception as e:
        logging.error(f"Error initializing Firebase: {e}", exc_info=True)
        raise

    logging.info("Creating Flask app...")
    app = Flask(__name__)
    logging.info("Flask app created.")

    logging.info("Configuring CORS...")
    CORS(app, origins=["https://news2talk.vercel.app"])
    logging.info("CORS configured.")

    try:
        logging.info("Registering blueprint...")
        app.register_blueprint(user_bp)
        logging.info("Blueprint registered successfully.")
    except Exception as e:
        logging.error(f"Error registering blueprint: {e}", exc_info=True)
        raise

    logging.info("create_app finished.")
    return app
