from app_core.models import db
from app_core.models.base_model import BaseModel


class HistoryPassChange(BaseModel):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    history_pass_change = db.Column(db.ARRAY(db.String))
    user = db.relationship("User", back_populates="history_pass_change")
