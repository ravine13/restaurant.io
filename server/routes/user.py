from models import db, User,Restaurant
from flask import request, jsonify, Blueprint
from werkzeug.security import generate_password_hash
from flask_jwt_extended import  jwt_required, get_jwt_identity

user_bp = Blueprint('user_bp', __name__)

#add users
@user_bp.route("/users", methods=["POST"])
def add_users():
    try:
        data= request.get_json()

        required_fields=["username", "email", "password"]
        for field in required_fields:
            if field not in data:
                return jsonify({"message": f"{field} is required"}), 400
            
        existing_user=User.query.filter((User.username == data["username"])| (User.email == data["email"])).first()
        if existing_user:
            return jsonify({"message":"Username or email already exists"}),400
        
        hashed_password=generate_password_hash(data["password"])

        new_user= User(
            username=data['username'],
            email=data["email"],
            password=hashed_password,
            profile_img=data.get("profile_img", ""),
            contact_info=data.get("contact_info", ""),
            first_name=data.get("first_name", ""),
            last_name=data.get("last_name", "")
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User added succcesfully"}),201
    except Exception as e:
        print(str(e))
        return jsonify({"message":"Internal Server Error"})
    

#fetch all users
@user_bp.route("/users", methods=["GET"])
def get_users():
    users=[user.to_dict() for user in db.session.query(User).all()]
    return jsonify(users),200

#fetch single user
@user_bp.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({"message": "User not found"}), 404

@user_bp.route('/users/<int:user_id>', methods=['PATCH'])
@jwt_required()
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.get_json()
    data.pop('password', None)  # Avoid updating the password directly

    for key, value in data.items():
        if hasattr(user, key):
            setattr(user, key, value)
    db.session.commit()

    return jsonify({"message": "User updated successfully"}), 200

#delete user
@user_bp.route('/users/<int:user_id>', methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"success": "User deleted successfully"}), 200
    else:
        return jsonify({"error": "User not found!"}), 404

@user_bp.route("/user/restaurant", methods=["GET"])
@jwt_required()
def get_user_restaurant():
    current_user_id = get_jwt_identity()
    user_restaurants = Restaurant.query.filter_by(owner_id=current_user_id).all()

    if user_restaurants:
        serialized_restaurants = [restaurant.to_dict() for restaurant in user_restaurants]
        return jsonify(serialized_restaurants), 200
    else:
        return jsonify({"message": "You are yet to list a Restaurant"}), 404
