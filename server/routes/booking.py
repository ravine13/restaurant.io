from models import db, Booking
from flask import request, jsonify, Blueprint
from flask_jwt_extended import  jwt_required, get_jwt_identity
from datetime import datetime

booking_bp = Blueprint('booking_bp', __name__)

@booking_bp.route("/bookings", methods=["POST"])
@jwt_required()
def create_booking():
    user_id = get_jwt_identity()
    data = request.get_json()

    required_fields = ["restaurant_id", "booking_date", "booking_time", "party_size"]
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"{field} is required"}), 400

    new_booking = Booking(
        user_id=user_id,
        restaurant_id=data["restaurant_id"],
        booking_date=datetime.strptime(data["booking_date"], "%B %d, %Y").date(),
        booking_time=datetime.strptime(data["booking_time"], "%H:%M").time(),
        party_size=data["party_size"],
        status="pending"  # the default status
    )

    db.session.add(new_booking)
    db.session.commit()

    return jsonify({"message": "Booking created successfully"}), 201

@booking_bp.route("/bookings", methods=["GET"])
@jwt_required()
def get_user_bookings():
    user_id=get_jwt_identity()
    user_bookings=Booking.query.filter_by(user_id=user_id).all()
    return jsonify([booking.to_dict() for booking in user_bookings]),200

@booking_bp.route("/bookings/restaurant", methods=["GET"])
@jwt_required()
def get_restaurant_bookings():
    restaurant_id=get_jwt_identity()
    restaurant_bookings=Booking.query.filter_by(restaurant_id=restaurant_id).all()

    return jsonify([booking.to_dict() for booking in restaurant_bookings]),200

@booking_bp.route("/bookings/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_booking(id):
    user_id= get_jwt_identity()
    booking=Booking.query.get(id)

    if not booking or booking.user_id != user_id:
        return jsonify({"message":"Booking not found or unauthoried"}),404
    
    db.session.delete(booking)
    db.session.commit()

    return jsonify({"message":"Booking deleted successfully"}),200

@booking_bp.route("/bookings/<int:id>", methods=["PUT"])
@jwt_required()
def edit_booking(id):
    user_id=get_jwt_identity()
    booking=Booking.query.get(id)

    if not booking or booking.user_id != user_id:
        return jsonify({"message":"Booking not found or umauthorized"}),404
    
    data = request.json()

    booking.booking_date = data.get("booking_date", booking.booking_date)
    booking.booking_time = data.get("booking_time", booking.booking_time)
    booking.party_size = data.get("party_size", booking.party_size)
    booking.status = data.get("status", booking.status)

    db.session.commit()

    return jsonify({"message":"Booking updated successfully"}),200