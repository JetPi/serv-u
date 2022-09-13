"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os 
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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
        role = "comprador"
        is_active = True

        if username is None or email is None or password is None:
            return jsonify('Send Payload'), 400
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            password = set_password(password, salt)
            request_user = User(username=username, email=email, role=role, is_active=is_active, password=password, salt=salt)
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
                    return jsonify({'token': Coin})
                else:
                    return jsonify('Bad credentials'), 400
            else:
                return jsonify("Couldn't find user"), 404
        else:
            return jsonify('Bad credentials'), 400
    return jsonify('Access'), 201


@api.route('/users', methods=['GET'])
@api.route('/users/<int:user_id>', methods=['GET'])
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


