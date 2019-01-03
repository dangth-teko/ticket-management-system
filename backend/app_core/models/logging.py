# coding=utf-8
from app_core.models.base_model import BaseModel
from app_core.models import db


class Logging(BaseModel):
    """Lưu lịch sử hoạt động của người dùng"""
    __tablename__ = 'logging'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    action_id = db.Column(db.Integer, db.ForeignKey('action.id'), nullable=False)
    user = db.relationship("User", back_populates="logging")
    action = db.relationship("Action", back_populates="logging")
