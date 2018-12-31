import datetime

from app_core.models import db, User
from app_core.models.base_model import BaseModel


class UserToken(BaseModel):
    __tablename__ = 'user_token'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.Text, nullable=False)
    expired_time = db.Column(db.TIMESTAMP, nullable=False)
    user = db.relationship("User", back_populates="tokens")

    @classmethod
    def insert_token(cls, token, user_id):
        user_token = UserToken(user_id=user_id, token=token)
        db.session.add(user_token)
        user_token.expired_time = datetime.datetime.now() + datetime.timedelta(minutes=30)
        user = User.query.filter_by(id=user_id).first()
        user_token.user = user
        db.session.flush()
        return "0"
