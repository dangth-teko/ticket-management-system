# coding=utf-8
from datetime import datetime
from app_core.models import db


class BaseModel(db.Model):
    """Model chung chứa id, create_at, update_at"""
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    created_at = db.Column(db.TIMESTAMP, default=datetime.now())
    updated_at = db.Column(db.TIMESTAMP, default=datetime.now())
