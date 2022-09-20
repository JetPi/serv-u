"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""


from ast import Or
import os
from unicodedata import name 
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from ast import Or
import os
from unicodedata import name 
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Order, Service, db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
from flask_jwt_extended import create_access_token

from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")


def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")


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
            request_user = User(username=username, email=email, role="comprador", is_active=True, password=password, salt=salt)
            db.session.add(request_user)

            try:
                db.session.commit()
                return jsonify('User created'), 201
            except Exception as error:
                db.session.rollback()
                print(error.args)
                return jsonify('Bad Credentials'), 500

    return jsonify(), 201

    
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
                    print(check_password)
                    Coin = create_access_token(identity=login_user.id)
                    return jsonify({'token': Coin, "user_id":login_user.id})
                else:
                    return jsonify('Bad credentials'), 400
            else:
                return jsonify("Couldn't find user"), 404
        else:
            return jsonify('Bad credentials'), 400
    return jsonify('Access'), 201


@api.route('/users', methods=['GET'])
def all_user(user_id = None):
    if request.method == 'GET':
        if user_id is None:
            user = User()
            user = user.query.all()
            
            return jsonify(list(map(lambda item: item.serialize(), user))) , 200
        else:
            user = User()
            user = user.query.get(user_id)
            if user:
                return jsonify(user.serialize())
            
        return jsonify({"message":"not found"}), 404

@api.route('/users/single_user', methods=['GET'])
@jwt_required()
def single_user():
    if request.method == 'GET':
        user_id = get_jwt_identity()  
        user = User().query.get(user_id)
        if user:
            return jsonify(user.serialize()), 200
        
    return jsonify({"message":"not found"}), 404

@api.route('/services', methods=['GET'])
@api.route('/services/<int:services_id>', methods=['GET'])
@api.route('/services/<string:search_type>', methods=['GET'])
def get_service(services_id = None, search_type = None):
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

            return jsonify(list(map(lambda item: item.serialize(), services))) , 200
            
        return jsonify({"message":"not found"}), 404


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

        if name is None or type is None or location is None or home_delivery is None or base_price is None:
            return jsonify('Verified your entries'), 400
        else:
            new_services = Service(name=name, type=type, location=location, home_delivery=home_delivery, base_price=base_price, description=description)
            db.session.add(new_services)

            try:
                db.session.commit()
                return jsonify(new_services.serialize()), 201
            except Exception as error:
                print(error.args)
                db.session.rollback()
                return jsonify({"message":f"Error {error.args}"}),500    
        
    return jsonify(), 201



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

        return jsonify(list(map(lambda item: item.serialize(), orders))) , 200
    else:
        return jsonify({"message":"not found"}), 404