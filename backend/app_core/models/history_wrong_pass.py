import datetime

from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.mutable import MutableList

from app_core.models import db
from app_core.models.base_model import BaseModel


# from app_core.models.user import User


class HistoryWrongPass(BaseModel):
    username = db.Column(db.String, db.ForeignKey('user.username'), nullable=False)
    time = db.Column(MutableList.as_mutable(ARRAY(db.TIMESTAMP)), default=[])
    user = db.relationship("User", back_populates="history_wrong_pass")
