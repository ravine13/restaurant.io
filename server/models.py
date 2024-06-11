from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-bookings','-restaurants')
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    profile_img = db.Column(db.String, nullable=True) 
    contact_info = db.Column(db.String(255), nullable=True)
    first_name=db.Column(db.String, nullable=True)
    last_name=db.Column(db.String, nullable=True)

     
    reviews = db.relationship('Review', backref=db.backref('user', lazy=True), cascade='all, delete-orphan')
    
class Restaurant(db.Model, SerializerMixin):
    """Restaurants that the user can review"""
    __tablename__ = 'restaurants'
    serialize_rules = ('-bookings.restaurant','-reviews.restaurant')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    phone_no = db.Column(db.Integer)
    description = db.Column(db.String)
    restaurant_img = db.Column(db.String, nullable=True)
    location = db.Column(db.String(255))
    capacity = db.Column(db.Integer)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id',ondelete="CASCADE"), nullable=False)

    bookings = db.relationship('Booking', backref=db.backref('restaurant', lazy=True),cascade='all, delete-orphan')
    reviews = db.relationship('Review', backref=db.backref('restaurant', lazy=True), cascade='all, delete-orphan')


class Booking(db.Model, SerializerMixin):
    """Bookings for tables at a restaurant"""
    __tablename__='bookings'

    serialize_rules = ('-user',)
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id',ondelete="CASCADE"), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id',ondelete="CASCADE"), nullable=False)
    booking_date = db.Column(db.Date, nullable=False)
    booking_time = db.Column(db.Time, nullable=False)
    party_size = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False)  # e.g., confirmed, pending, cancelled

class Review(db.Model, SerializerMixin):
    """Reviews left by users about restaurants"""
    __tablename__ = 'reviews'
    
    serialize_rules = ('-restaurant','-user.reviews')
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id',ondelete="CASCADE"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id',ondelete="CASCADE"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti =  db.Column(db.String(100),nullable=True)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)