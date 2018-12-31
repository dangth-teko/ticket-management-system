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
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Integer, nullable=False)
    is_active = db.Column(db.SmallInteger, nullable=False)
    last_login = db.Column(db.TIMESTAMP)
    tokens = db.relationship("UserToken", back_populates="user")
    history_pass_change = db.relationship("HistoryPassChange", back_populates='user')
    history_wrong_pass = db.relationship("HistoryWrongPass", back_populates='user')
    logging = db.relationship("Logging", back_populates='user')

    # db.UniqueConstraint(username, email, name='uix_1')
    @staticmethod
    def hash_password(password):
        return bcrypt.hashpw(password, bcrypt.gensalt())

