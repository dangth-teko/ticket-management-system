from app_core.models import db
from app_core.models.base_model import BaseModel


class HistoryWrongPass(BaseModel):
    username = db.Column(db.String, db.ForeignKey('user.username'), nullable=False)
    time = db.Column(db.ARRAY(db.TIMESTAMP))
    user = db.relationship("User", back_populates="history_wrong_pass")
