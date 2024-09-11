from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config.from_object('config.Config')

# Initialize Extensions
db = SQLAlchemy(app)
CORS(app)  # Enable CORS for cross-origin requests (needed for frontend-backend interaction)

# Import and Register Blueprints (routes)
from routes.api import api_blueprint
from routes.auth import auth_blueprint
from routes.chat import chat_blueprint

app.register_blueprint(api_blueprint, url_prefix='/api')
app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(chat_blueprint, url_prefix='/chat')

# Running the app
if __name__ == '__main__':
    app.run(debug=True)
