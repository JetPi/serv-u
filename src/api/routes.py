"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from ast import Or
import os
from unicodedata import name
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Comment, Order, Service, db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta, datetime

from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode


# cloudinary
import cloudinary.uploader as uploader

api = Blueprint('api', __name__)


def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")


def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

# Signup user
@api.route('/signup', methods=['POST'])
def add_user():
    if request.method == 'POST':
        body = request.json
        username = body.get('username', None)
        email = body.get('email', None)
        password = body.get('password', None)

        if username is None or email is None or password is None:
            return jsonify('Send Payload'), 400
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            password = set_password(password, salt)
            request_user = User(username=username, email=email, role="comprador",
                                is_active=True, password=password, salt=salt)
            db.session.add(request_user)

            try:
                db.session.commit()
                return jsonify('User created'), 201
            except Exception as error:
                db.session.rollback()
                print(error.args)
                return jsonify('Bad Credentials'), 500

    return jsonify(), 201

# Login
@api.route('/login', methods=['POST'])
def login_user():
    if request.method == 'POST':
        body = request.json
        email = body.get('email', None)
        password = body.get('password', None)

        if email is not None or password is not None:
            login_user = User.query.filter_by(email=email).one_or_none()
            if login_user:
                if check_password(login_user.password, password, login_user.salt):

                    Coin = create_access_token(
                        identity=login_user.id, expires_delta=timedelta(days=1))
                    return jsonify({'token': Coin, "user_id": login_user.id})

                    Coin = create_access_token(identity=login_user.id, expires_delta=timedelta(minutes=1))
                    return jsonify({'token': Coin, "user_id":login_user.id})


                else:
                    return jsonify('Bad credentials'), 400
            else:
                return jsonify("Couldn't find user"), 404
        else:
            return jsonify('Bad credentials'), 400
    return jsonify('Access'), 201

# Get all users
@api.route('/users', methods=['GET'])
def all_user(user_id=None):
    if request.method == 'GET':
        if user_id is None:
            user = User()
            user = user.query.all()

            return jsonify(list(map(lambda item: item.serialize(), user))), 200
        else:
            user = User()
            user = user.query.get(user_id)
            if user:
                return jsonify(user.serialize())

        return jsonify({"message": "not found"}), 404

# Get a particular user'
@api.route('/users/single_user', methods=['GET'])
@jwt_required()
def single_user():
    if request.method == 'GET':
        user_id = get_jwt_identity()
        user = User().query.get(user_id)
        if user:
            return jsonify(user.serialize()), 200

    return jsonify({"message": "not found"}), 404

# Get services
@api.route('/services', methods=['GET'])
@api.route('/services/<int:services_id>', methods=['GET'])
@api.route('/services/<string:search_type>', methods=['GET'])
def get_service(services_id=None, search_type=None):
    if request.method == 'GET':
        if services_id is not None:
            services = Service()
            services = services.query.get(services_id)
            if services:
                return jsonify(services.serialize())

        elif search_type is not None:
            services = Service()
            services = services.query.filter_by(type=search_type).all()

        else:
            services = Service()
            services = services.query.all()

            return jsonify(list(map(lambda item: item.serialize(), services))), 200

        return jsonify({"message": "not found"}), 404

# Post service, now with cloudinary
@api.route('/services', methods=['POST'])
def publish_service():
    if request.method == 'POST':
        body = request.json
        name = body.get('name', None)
        type = body.get('type', None)
        location = body.get('location', None)
        home_delivery = body.get('home_delivery', None)
        base_price = body.get('base_price', None)
        description = body.get('description', None)
        image = request.files['file']

        if name is None or type is None or location is None or home_delivery is None or base_price is None:
            return jsonify('Verified your entries'), 400
        else:
            cloudinary_upload = uploader.upload(image)
            new_services = Service(name=name, type=type, location=location, home_delivery=home_delivery, base_price=base_price,
                                   description=description, service_photo_url=cloudinary_upload["url"],  cloudinary_id_service=cloudinary_upload["public_id"])
            db.session.add(new_services)

            try:
                db.session.commit()
                return jsonify(new_services.serialize()), 201
            except Exception as error:
                print(error.args)
                db.session.rollback()
                return jsonify({"message": f"Error {error.args}"}), 500

    return jsonify(), 201

# Get orders 
@api.route('/orders', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    orders = Order()
    orders = orders.query.filter_by(user_id=user_id).all()
    print(orders)
    if orders is None:
        return jsonify('Empty'), 400
    elif orders is not None:
        orders = Order()
        orders = orders.query.all()

        return jsonify(list(map(lambda item: item.serialize(), orders))), 200
    else:
        return jsonify({"message": "not found"}), 404


# ruta para actualizar la foto del perfil y el banner



#Ruta para actualizar la foto del perfil y el banner

@api.route('/profile/<int:user_id>', methods=['PATCH'])
def publish_profile_photo(user_id=None):
    body = request.files
    if user_id is not None:
        get_user_info = User.query.get(user_id)

    try:
        image_profile = body['file_profile']
        image_banner = body['file_banner']
        cloudinary_upload_profile = uploader.upload(image_profile)
        cloudinary_upload_banner = uploader.upload(image_banner)

        get_user_info.profile_photo_url = cloudinary_upload_profile["url"]
        get_user_info.cloudinary_id_profile = cloudinary_upload_profile["public_id"]

        get_user_info.banner_photo_url = cloudinary_upload_banner["url"]
        get_user_info.cloudinary_id_banner = cloudinary_upload_banner["public_id"]

        db.session.commit()
        return jsonify({"message": "todo bien"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": f"Error {error.args}"}), 500



@api.route('/orders', methods=['PATCH'])  # actualizar
@api.route('/orders/<int:order_id>', methods=['PATCH'])  # actualizar

# Update order status
@api.route('/orders', methods=['PATCH'])#actualizar
@api.route('/orders/<int:order_id>', methods=['PATCH'])#actualizar

def update_order(order_id=None):
    if request.method == 'PATCH':
        body = request.json
        print(request.json)
        if order_id is None:
            return jsonify({"message": "Bad request"}), 400

        if order_id is not None:
            update_order = Order.query.get(order_id)
            if update_order is None:
                return jsonify({"message": "Not found"}), 404
            else:
                update_order.status = body["status"]

                try:
                    db.session.commit()
                    return jsonify(update_order.serialize()), 201
                except Exception as error:
                    print(error.args)
                    return jsonify({"message": f"Error {error.args}"}), 500

        return jsonify([]), 200
    return jsonify([]), 405


@api.route('/user/comments', methods=['POST'])
@jwt_required()
def publish_comment():
    if request.method == 'POST':
        body = request.json
        user_id = get_jwt_identity()
        observation = body.get('observation', None)
        services_id = body.get('services_id', None)

        if observation is None or services_id is None:
            return jsonify('Verified your entries'), 400
        else:
            new_comment = Comment(
                user_id=user_id, observation=observation, services_id=services_id)
            db.session.add(new_comment)

            try:
                db.session.commit()
                return jsonify(new_comment.serialize()), 201
            except Exception as error:
                print(error.args)
                db.session.rollback()
                return jsonify({"message": f"Error {error.args}"}), 500

    return jsonify(), 201


@api.route('/user/comments', methods=['GET'])
@jwt_required()
def get_comment():
    user_id = get_jwt_identity()
    comments = Comment()
    comments = comments.query.filter_by(user_id=user_id).all()
    print(comments)
    if comments is None:
        return jsonify('Empty'), 400
    elif comments is not None:
        comments = Comment()
        comments = comments.query.all()

        return jsonify(list(map(lambda item: item.serialize(), comments))), 200
    else:
        return jsonify({"message": "not found"}), 404
