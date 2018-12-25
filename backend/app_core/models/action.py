from app_core.models.base_model import BaseModel
from app_core.models import db


class Action(BaseModel):
    detail = db.Column(db.String, nullable=False)
    logging = db.relationship("Logging", back_populates='action')
