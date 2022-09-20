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
    comprador = "comprador",
    vendedor = "vendedor"

class User(db.Model):
    # Identifications
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(200), nullable=False)
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
            "role": self.role.name 
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
    orders = db.relationship('Order', backref="service", lazy=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type.name,
            "home_delivery": self.home_delivery,
            "location": self.location,
            "base_price": self.base_price, 
            "description": self.description,
            "base_price": self.base_price 
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