# Import statements
from flask import Flask, Blueprint
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv 
from routes import *
from models import db, User, Restaurant, Booking, Review  # Assuming models.py contains your SQLAlchemy models
from jwt_config import init_jwt 
from routes import user_bp, restaurant_bp, booking_bp, review_bp, auth_bp


load_dotenv()

# Initialize Marshmallow, Bcrypt, and JWTManager globally
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
    
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') 
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate = Migrate(app, db)
    init_jwt(app)
    

    app.register_blueprint(user_bp)
    app.register_blueprint(restaurant_bp)
    app.register_blueprint(booking_bp)
    app.register_blueprint(review_bp)
    app.register_blueprint(auth_bp)
    

    CORS(app, resources={r"*": {"origins": "*"}})
    
    return app

# Create and run the app
app = create_app()
if __name__ == "__main__":
    app.run(debug=True, port=5555)
