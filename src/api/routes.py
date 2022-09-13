"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login_user():
    body = request.json
    email = body.get("email")
    password = body.get("password")

    if email is None or password is None:
        return jsonify({"message":"Error, bad request"}), 400
    else:
        current_user = User.query.filter_by(email=email).one_or_none()
        if current_user is None:
            return jsonify({"message":"Error, couldn't find user"}), 404
        else:
            if current_user.password == password:
                token = create_access_token(identity=current_user.id)
                return jsonify({"token":token}), 201
            else: 
                return jsonify({"message":"Error, bad credentials"}), 400

