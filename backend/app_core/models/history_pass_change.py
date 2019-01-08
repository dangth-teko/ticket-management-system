from flask_bcrypt import Bcrypt
import logging

from sqlalchemy.ext.mutable import MutableList

from app_core.models import db, BaseModel, User
from sqlalchemy.dialects.postgresql import ARRAY

_logger = logging.getLogger(__name__)

bcrypt = Bcrypt()


class HistoryPassChange(BaseModel):
    """Lưu 5 lần đổi password gần nhất"""
    __tablename__ = 'history_pass_change'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    history_pass_change = db.Column(MutableList.as_mutable(ARRAY(db.String)), default={})
    user = db.relationship("User", back_populates="history_pass_change")

    def __init__(self, user_id, password):
        self.user_id = user_id,
        self.history_pass_change = []
        self.history_pass_change.append(password)

    @classmethod
    def check_current_password(cls, user_id, old_password):
        """
        Kiểm tra có khớp với mật khẩu hiện tại hay không
        :param user_id: Id của user
        :type user_id: Integer
        :param old_password: Mật khẩu cũ
        :type old_password: String
        :return: Kết quả so sánh
        :rtype: Boolean
        """
        current_password = cls.query.filter_by(user_id=user_id).first()
        if current_password is None:
            return False
        else:
            return bcrypt.check_password_hash(current_password.history_pass_change[-1], old_password)

    @classmethod
    def check_history_password(cls, user_id, new_password):
        """
        Kiểm tra 5 password gần nhất xem có trùng với password mới hay không
        :param user_id: Id của user
        :type user_id: Integer
        :param new_password: Mật khẩu mới
        :type new_password: String
        :return: Kết quả so sánh
        :rtype: Boolean
        """
        passwords = HistoryPassChange.query.filter_by(user_id=user_id).first().history_pass_change
        for password in passwords:
            if bcrypt.check_password_hash(password, new_password):
                return False
        return True

    @classmethod
    def add_password(cls, user_id, new_password):
        """
        Thêm mật khẩu mới vào lịch sử thay đổi
        :param user_id: Id của user
        :type user_id: Integer
        :param new_password: Mật khẩu mới
        :type new_password: String
        """
        passwords = HistoryPassChange.query.filter_by(user_id=user_id).first()
        if len(passwords.history_pass_change) >= 5:
            passwords.history_pass_change.pop(0)
        passwords.history_pass_change.append(User.hash_password(new_password))
        db.session.commit()
