# coding=utf-8
import bcrypt
import logging
import datetime

# import bcrypt as bcrypt

from app_core.models import db
from app_core.models.base_model import BaseModel

_logger = logging.getLogger(__name__)


class User(BaseModel):
    __tablename__ = 'user'

    # id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, primary_key=True)
    email = db.Column(db.String, primary_key=True)
    password = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Integer, nullable=False)
    is_active = db.Column(db.SmallInteger, nullable=False)
    last_login = db.Column(db.TIMESTAMP, nullable=True)
    tokens = db.relationship("UserToken", back_populates="user")
    history_pass_change = db.relationship("HistoryPassChange", back_populates='user')
    history_wrong_pass = db.relationship("HistoryWrongPass", back_populates='user')
    logging = db.relationship("Logging", back_populates='user')
    # db.UniqueConstraint(username, email, name='uix_1')

    def __init__(self, username, email, password, is_admin):
        self.username = username
        self.date_joined = datetime.datetime.now()
        self.email = email
        self.password = User.hashed_password(password)
        self.is_admin = 0
        self.is_active = 0

    @staticmethod
    def hashed_password(password):
        return bcrypt.hashpw(password, bcrypt.gensalt())

    @staticmethod
    def get_user(username, password):
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.checkpw(password, user.password):
            return True
        else:
            return False
