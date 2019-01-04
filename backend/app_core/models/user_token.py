
# coding=utf-8
import datetime

from app_core.models import db, User, BaseModel


class UserToken(BaseModel):
    __tablename__ = 'user_token'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.Text, nullable=False)
    expired_time = db.Column(db.TIMESTAMP, nullable=False)
    user = db.relationship("User", back_populates="tokens")

    @classmethod
    def insert_token(cls, token, user_id):
        """
                insert token vào db.
                :param token:
                :param user_:
                """
        user_token = UserToken.query.filter_by(token=token).first()
        if not user_token:
            user_token = UserToken(user_id=user_id, token=token, expired_time = datetime.datetime.now() + datetime.timedelta(minutes=30))
            db.session.add(user_token)
            user = User.query.filter_by(id=user_id).first()
            user_token.user = user
        user_token.expired_time = datetime.datetime.now() + datetime.timedelta(minutes=30)
        db.session.flush()
        return "0"

    @classmethod
    def get_user_by_token(cls, token):
        """
                get user bằng token.
                :param token:
                :return user:
                """
        token = UserToken.query.filter_by(token=token).first()
        if token:
            if token.expired_time > datetime.datetime.now():
                user = User.query.filter_by(id=token.user_id)
                return user
            else:
                db.session.delete(token)
                db.session.flush()
        return None
