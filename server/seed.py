from datetime import datetime, timedelta, timezone
from models import db,User,Restaurant, Booking,Review
from random import sample, randint
from faker import Faker
from sqlalchemy import func
from werkzeug.security import generate_password_hash
from app import app

fake=Faker()

def seed_user():
    users = []
    for _ in range(20):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password=generate_password_hash("opentable"),
            profile_img=fake.image_url(),
            contact_info=fake.phone_number(),
            first_name=fake.first_name(),
            last_name=fake.last_name()
        )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

def seed_restaurant():
    restaurants = []
    for _ in range(12):
        restaurant = Restaurant(
            name=fake.company(),
            phone_no=int(("").join(fake.msisdn().replace('-','')[:9])),
            description=fake.text(),
            restaurant_img=fake.image_url(),
            location=fake.address(),
            capacity=randint(20, 100),
            owner_id=User.query.order_by(func.random()).first().id
        )
        restaurants.append(restaurant)
    db.session.add_all(restaurants)
    db.session.commit()

def seed_booking():
    bookings = []
    for _ in range(24):
        booking = Booking(
            user_id=User.query.order_by(func.random()).first().id,
            restaurant_id=Restaurant.query.order_by(func.random()).first().id,
            booking_date=datetime.now(timezone.utc) + timedelta(days=randint(1, 30)),
            booking_time=datetime.strptime(fake.time(), '%H:%M:%S').time(),
            party_size=randint(1, 10),
            status=sample(['confirmed', 'pending', 'cancelled'], 1)[0]
        )
        bookings.append(booking)
    db.session.add_all(bookings)
    db.session.commit()

def seed_review():
    reviews = []
    for restaurant in Restaurant.query.all():
        num_reviews = randint(1, 6)
        for _ in range(num_reviews):
            review = Review(
                restaurant_id=restaurant.id,
                user_id=User.query.order_by(func.random()).first().id,
                rating=randint(1, 5),
                comment=fake.text(),
                date_posted=datetime.now(timezone.utc) + timedelta(days=randint(1, 365))
            )
            reviews.append(review)
    db.session.add_all(reviews)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.session.query(User).delete()
        db.session.query(Restaurant).delete()
        db.session.query(Booking).delete()
        db.session.query(Review).delete()
        seed_user()
        seed_restaurant()
        seed_booking()
        seed_review()