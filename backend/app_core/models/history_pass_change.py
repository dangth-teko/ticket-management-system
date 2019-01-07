import bcrypt
import logging

from sqlalchemy.ext.mutable import MutableList

from app_core.models import db, BaseModel, User
from sqlalchemy.dialects.postgresql import ARRAY

_logger = logging.getLogger(__name__)

class HistoryPassChange(BaseModel):
    __tablename__ = 'history_pass_change'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    history_pass_change = db.Column(MutableList.as_mutable(ARRAY(db.String)), default=[])
    user = db.relationship("User", back_populates="history_pass_change")

    @classmethod
    def check_history_password(cls, user_id, new_password):
        passwords = HistoryPassChange.query.filter_by(user_id=user_id).first().history_pass_change
        for password in passwords:
            if bcrypt.checkpw(new_password.encode('utf-8'), password.encode('utf-8')):
                return False
        return True

    @classmethod
    def check_password(cls, user_id, old_password):
        current_password = cls.query.filter_by(user_id=user_id).first().history_pass_change[-1]
        _logger.error(current_password)
        return bcrypt.checkpw(old_password.encode('utf-8'), current_password.encode('utf-8'))

    @classmethod
    def add_password(cls, user_id, new_password):
        passwords = HistoryPassChange.query.filter_by(user_id=user_id).first()
        if len(passwords.history_pass_change) >= 5:
            passwords.history_pass_change.pop(0)
        passwords.history_pass_change.append(User.hash_password(new_password))
        _logger.error(len(passwords.history_pass_change))
        db.session.commit()
