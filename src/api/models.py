from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()

class Role(Enum):
    comprador = "comprador",
    vendedor = "vendedor"

class User(db.Model):
    # Identifications
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    role = db.Column(db.Enum(Role), nullable=False)
    salt = db.Column(db.String(80), unique=False, nullable=False)    
        

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "is_active": self.is_active,
            "role": self.role.email 
        }