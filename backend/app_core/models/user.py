# coding=utf-8

import logging
import datetime

from flask_bcrypt import Bcrypt

from app_core.models import db, BaseModel

_logger = logging.getLogger(__name__)

bcrypt = Bcrypt()


class User(BaseModel):
    """Lưu thông tin user"""
    __tablename__ = 'user'
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

    @staticmethod
    def hash_password(password):
        hash = bcrypt.generate_password_hash(password, 10)
        return hash.decode('utf-8')

    @classmethod
    def get_user_by_username_password(cls, username, password):
        """
                Get user
                :param username:
                :param password:
                :return user:
                """
        user = User.query.filter_by(username=username).first()
        if user:
            if user.is_active == 0:
                if ((datetime.datetime.now() > user.updated_at + datetime.timedelta(minutes=15))):
                    user.is_active = 1
                    user.updated_at = datetime.datetime.now()
                    db.session.flush()
            if user.is_active == 1:
                if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                    return user
        else:
            return None

    @classmethod
    def change_password(cls, user, newPassword):
        """
        Thay đổi password
        :param user:
        :param newPassword:
        """
        user.password = cls.hash_password(newPassword)
        db.session.commit()
