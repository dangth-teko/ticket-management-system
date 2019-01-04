# coding=utf-8
import bcrypt
import logging
import datetime

# import bcrypt as bcrypt

from app_core.models import db
from app_core.models.base_model import BaseModel
from app_core.models.history_wrong_pass import HistoryWrongPass

_logger = logging.getLogger(__name__)


class User(BaseModel):
    __tablename__ = 'user'

    # id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, primary_key=True, unique=True)
    email = db.Column(db.String, primary_key=True, unique=True)
    password = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Integer, nullable=False)
    is_active = db.Column(db.SmallInteger, nullable=False)
    last_login = db.Column(db.TIMESTAMP)
    tokens = db.relationship("UserToken", back_populates="user")
    history_pass_change = db.relationship("HistoryPassChange", back_populates='user')
    history_wrong_pass = db.relationship("HistoryWrongPass", back_populates='user')
    logging = db.relationship("Logging", back_populates='user')

    # db.UniqueConstraint(username, email, name='uix_1')

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.is_admin = 0
        self.is_active = 1
        self.created_at = datetime.datetime.now()
        self.updated_at = datetime.datetime.now()

    @staticmethod
    def hashed_password(password):
        return bcrypt.hashpw(password, bcrypt.gensalt())
    
    @classmethod
    def get_user_by_username(cls, username):
        user = User.query.filter_by(username=username).first()
        if user:
            return user
        else:
            return None

    @classmethod
    def update_status(cls, username, is_active):
        user = User.query.filter_by(username=username).first()
        user.is_active = is_active
        db.session.flush()
