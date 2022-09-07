from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()

class UserNature(Enum):
    user = "user",
    moderator = "moderator"

class User(db.Model):
    # Identifications
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=False, nullable=False)
    userNature = db.Column(db.Enum(UserNature), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    # Verification
    password = db.Column(db.String(80), unique=False, nullable=False)
    

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "is_active": self.is_active,
            # do not serialize the password, its a security breach
        }