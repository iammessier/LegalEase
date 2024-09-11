from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize the database object
db = SQLAlchemy()

def create_app():
    # Initialize the Flask app
    app = Flask(__name__)

    # Enable CORS for the app
    CORS(app)

    # Load configuration (example using a config file)
    app.config.from_object('legalease_backend.config.Config')

    # Initialize extensions
    db.init_app(app)

    # Register Blueprints or Routes
    from backend.routes import main
    app.register_blueprint(main)

    return app
