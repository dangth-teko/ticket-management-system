# coding=utf-8
import logging
import datetime

from app_core.models import db

_logger = logging.getLogger(__name__)


class Post(db.Model):
    """
            Bảng default để cho đẹp.
            """

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    text = db.Column(db.String, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False)

    def __init__(self, text):
        self.text = text
        self.date_posted = datetime.datetime.now()
