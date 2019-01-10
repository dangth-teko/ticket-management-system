# coding=utf-8

import datetime
import logging

from app_core.models import db, User, BaseModel
from sqlalchemy import or_

_logger = logging.getLogger(__name__)

class SignupRequest(BaseModel):
    """Signup Request Model
    Lưu thông tin user chưa được active"""
    __tablename__ = 'signup_request'
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Boolean)
    expired_time = db.Column(db.TIMESTAMP)
    user_token_confirm = db.Column(db.String, nullable=False)

    def __init__(self, username, email, password, token):
        """Init Signup Request model
        :param username
        :param email
        :param password
        :param token"""
        self.username = username
        self.email = email
        self.password = User.hash_password(password)
        self.is_admin = 0
        self.user_token_confirm = token
        self.expired_time = datetime.datetime.now() + datetime.timedelta(minutes=30)

    @classmethod
    def get_user_by_username_or_email(cls, username, email):
        """
            Get user
            :param username:
            :return user:
        """
        try:
            user = SignupRequest.query.filter(or_(SignupRequest.username == username, SignupRequest.email == email)).first()
            if user is None:
                raise Exception
            return user
        except Exception as error:
            _logger.error("User không tồn tại", error)
            return None
