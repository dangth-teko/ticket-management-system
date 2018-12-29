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
        self.password = User.hashed_password(password)
        self.is_admin = 0
        self.is_active = 1
        self.created_at = datetime.datetime.now()
        self.updated_at = datetime.datetime.now()

    @staticmethod
    def hashed_password(password):
        return bcrypt.hashpw(password, bcrypt.gensalt())

    @classmethod
    def get_user_by_username_password(cls, username, password):
        user = User.query.filter_by(username=username).first()
        if user:
            if user.is_active == 0:
                if ((datetime.datetime.now() > user.updated_at + datetime.timedelta(minutes=15))):
                    user.is_active = 1
                    db.session.flush()
                else:
                    return None
            if user.is_active:
                if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                    return user
                else:
                    return cls.insert_time(username)
        else:
            return None

    @classmethod
    def update_status(cls, username, is_active):
        user = User.query.filter_by(username=username).first()
        user.is_active = is_active
        db.session.flush()

    @classmethod
    def insert_time(cls, username):
        history_wrong_pass = HistoryWrongPass.query.filter_by(username=username).first()
        if not history_wrong_pass:
            history_wrong_pass = HistoryWrongPass(username=username, time=[])
            user = User.query.filter_by(username=username).first()
            print(user)
            history_wrong_pass.user = user
            db.session.add(history_wrong_pass)
        history_wrong_pass.time.append(datetime.datetime.now())
        db.session.commit()
        length_history = len(history_wrong_pass.time)

        if length_history == 3:
            if ((history_wrong_pass.time[2] - history_wrong_pass.time[0]) <= 5 * 60):
                return {'capcha': True,
                        'block': False}
        elif length_history == 4:
            if ((history_wrong_pass.time[3] - history_wrong_pass.time[1]) <= 5 * 60):
                return {'capcha': True,
                        'block': False}
        elif length_history == 6:
            history_wrong_pass.time.pop(0)
        # print(length_history)
        # db.session.flush()

        # print(history_wrong_pass.time)
        # print(history_wrong_pass.username)
        if len(history_wrong_pass.time) == 5:
            if ((history_wrong_pass.time[4] - history_wrong_pass.time[0]) <= 10 * 60):
                history_wrong_pass.user.is_active = 0
                return {'capcha': False,
                        'block': True}
            elif ((history_wrong_pass.time[4] - history_wrong_pass.time[2]) <= 5 * 60):
                return {'capcha': True,
                        'block': False}
        db.session.commit()
        return None
