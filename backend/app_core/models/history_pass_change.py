from sqlalchemy.ext.mutable import MutableList

from app_core.models import db
from app_core.models.base_model import BaseModel
from sqlalchemy.dialects.postgresql import ARRAY


class HistoryPassChange(BaseModel):
    __tablename__ = 'history_pass_change'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    history_pass_change = db.Column(MutableList.as_mutable(ARRAY(db.String)), default=[])
    user = db.relationship("User", back_populates="history_pass_change")

    @classmethod
    def check_history_password(cls, new_password):
        return True

    @classmethod
    def check_password(cls, old_password):
        return True
