import os

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db,User,Restaurant,Booking,Review
from flask_cors import CORS
from views import *
from flask_jwt_extended import JWTManager
import secrets

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URI')

CORS(app)

db.init_app(app)
migrate = Migrate(app, db)

jwt = JWTManager()
app.config["JWT_SECRET_KEY"] = secrets.token_hex(16)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt.init_app(app)
CORS(app)

app.register_blueprint(user_bp)
app.register_blueprint(restaurant_bp)
app.register_blueprint(booking_bp)
app.register_blueprint(review_bp)
app.register_blueprint(auth_bp)

@jwt.token_in_blocklist_loader
def token_in_blocklist_callback(jwt_header, jwt_data):
    jti = jwt_data['jti']
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    if token:
        return token 
    else:
        return None


if __name__ == '__main__':
    app.run(port=5000, debug=True)