# coding=utf-8
import datetime
import logging

from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.mutable import MutableList

from app_core.models import db, BaseModel, User

_logger = logging.getLogger(__name__)
# from app_core.models.user import User


class HistoryWrongPass(BaseModel):
    """Lưu 5 lần nhập sai password gần nhất"""
    __tablename__ = 'history_wrong_pass'
    username = db.Column(db.String, db.ForeignKey('user.username'), nullable=False)
    time = db.Column(MutableList.as_mutable(ARRAY(db.TIMESTAMP)), default=[])
    user = db.relationship("User", back_populates="history_wrong_pass")

    @classmethod
    def insert_check_time(cls, username):
        """
                insert và check thời gian của lần nhập sai pass vào db.
                :param username:
                :return error:
                """
        error = {'code': 1, 'message': "Sai password vui lòng nhập lại!"}
        try:
            user = User.query.filter_by(username=username).first()
            if user is None:
                raise Exception
            try:
                history_wrong_pass = HistoryWrongPass.query.filter_by(username=username).first()
                if history_wrong_pass is None:
                    raise Exception
                history_wrong_pass.time.append(datetime.datetime.now())
                db.session.commit()
                length_history = len(history_wrong_pass.time)

                if length_history == 3:
                    if (history_wrong_pass.time[2] - datetime.timedelta(minutes=5)) <= history_wrong_pass.time[0]:
                        error = {'code': 3, 'message': "Sai password quá 3 lần"}
                elif length_history == 4:
                    if (history_wrong_pass.time[3] - datetime.timedelta(minutes=5)) <= history_wrong_pass.time[1]:
                        error = {'code': 3, 'message': "Sai password quá 3 lần"}
                elif length_history == 6:
                    history_wrong_pass.time.pop(0)
                if len(history_wrong_pass.time) == 5:
                    if (history_wrong_pass.time[4] - datetime.timedelta(minutes=10)) <= history_wrong_pass.time[0]:
                        history_wrong_pass.user.is_active = 0
                        history_wrong_pass.user.updated_at = datetime.datetime.now()
                        error = {'code': 1, 'message': "Tài khoản bị khóa, bạn vui lòng đăng nhập lại sau 15 phút"}
                    elif (history_wrong_pass.time[4] - datetime.timedelta(minutes=5)) <= history_wrong_pass.time[2]:
                        error = {'code': 3, 'message': "Sai password quá 3 lần"}
                db.session.commit()

            except Exception as error_log:
                _logger.error("History Password không tồn tại", error_log)
                history_wrong_pass = HistoryWrongPass(username=username, time=[])
                history_wrong_pass.user = user
                db.session.add(history_wrong_pass)

        except Exception as error_log:
            _logger.error("Không tìm thấy user", error_log)
            error = {'code': 1, 'message': "Username không tồn tại"}
        return error
