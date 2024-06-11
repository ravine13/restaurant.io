# main application file
import os
from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Restaurant, Booking, Review
# from views import *
from Auth import init_jwt

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URI')

CORS(app)
db.init_app(app)
migrate = Migrate(app, db)

init_jwt(app) 

app.register_blueprint(user_bp)
app.register_blueprint(restaurant_bp)
app.register_blueprint(booking_bp)
app.register_blueprint(review_bp)
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
