from email.policy import default
from unicodedata import name
from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()


class OrderStatus(Enum):
    pendiente = "pendiente"
    culminado = "culminado"


class ServiceType(Enum):
    electricidad = "electricidad"
    plomeria = "plomeria"
    hogar = "hogar"


class Role(Enum):
    comprador = "comprador"
    vendedor = "vendedor"
    admin = "admin"


class User(db.Model):
    # Identifications
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(200), nullable=False)

    profile_photo_url = db.Column(db.String(500), nullable=True, unique=True)
    cloudinary_id_profile = db.Column(
        db.String(500), unique=True, nullable=True)
    banner_photo_url = db.Column(db.String(500), nullable=True, unique=True)
    cloudinary_id_banner = db.Column(
        db.String(500), unique=True, nullable=True)

    is_active = db.Column(db.Boolean(), unique=False, default=True)
    role = db.Column(db.Enum(Role), nullable=False)
    salt = db.Column(db.String(80), unique=False, nullable=False)
    services = db.relationship('Service', lazy=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "is_active": self.is_active,
            "role": self.role.name,
            "profile_photo_url": self.profile_photo_url,
            "cloudinary_id_profile": self.cloudinary_id_profile,
            "banner_photo_url": self.banner_photo_url,
            "cloudinary_id_banner": self.cloudinary_id_banner

        }


class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.Enum(ServiceType), nullable=False)
    home_delivery = db.Column(db.Boolean(), nullable=False, default=True)
    location = db.Column(db.String(200), nullable=False)
    clients = db.Column(db.String(100))
    description = db.Column(db.String(500))
    base_price = db.Column(db.Integer, nullable=False)
    service_photo_url = db.Column(db.String(500), nullable=True, unique=True)
    cloudinary_id_service = db.Column(
        db.String(500), unique=True, nullable=False)
    orders = db.relationship('Order', backref="service", lazy=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    comments = db.relationship('Comment', backref="service", lazy=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type.name,
            "home_delivery": self.home_delivery,
            "location": self.location,
            "base_price": self.base_price,
            "description": self.description,
            "base_price": self.base_price,
            "service_photo_url": self.service_photo_url,
            "cloudinary_id_service": self.cloudinary_id_service
        }


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Enum(OrderStatus), nullable=False)
    services_id = db.Column(db.Integer, db.ForeignKey('service.id'))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "status": self.status.name,
            "services": self.services_id
        }


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    observation = db.Column(db.String(300), nullable=False)
    services_id = db.Column(db.Integer, db.ForeignKey('service.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def serialize(self):
        return {
            "id": self.id,
            "user_data": User.query.get(self.user_id).serialize(),
            "observation": self.observation,
            "services_id": self.services_id
        }
