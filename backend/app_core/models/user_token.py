from app_core.models import db
from app_core.models.base_model import BaseModel


class UserToken(BaseModel):
    __tablename__ = 'user_token'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.Text, nullable=False)
    expired_time = db.Column(db.TIMESTAMP, nullable=False)
    user = db.relationship("User", back_populates="tokens")
