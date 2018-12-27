import datetime

from app_core.models.base_model import BaseModel
from app_core.models import db


class SignupRequest(BaseModel):
    __tablename__ = 'signup_request'
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Boolean)
    expired_time = db.Column(db.TIMESTAMP, default=datetime.datetime.now() + datetime.timedelta(minutes=30))
