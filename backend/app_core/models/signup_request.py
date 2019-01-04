import datetime

from app_core.models.base_model import BaseModel
from app_core.models import User
from app_core.models import db


class SignupRequest(BaseModel):
    __tablename__ = 'signup_request'
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Boolean)
    expired_time = db.Column(db.TIMESTAMP)
    user_token_confirm = db.Column(db.String, nullable=False)

    def __init__(self, username, email, password, token):
        self.username = username
        self.email = email
        self.password = User.hashed_password(password)
        self.is_admin = 0
        self.user_token_confirm=token
        self.expired_time = datetime.datetime.now() + datetime.timedelta(minutes=30)