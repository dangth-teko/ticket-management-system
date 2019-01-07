# coding=utf-8
# import json
import logging
import re

from flask import Blueprint, render_template, request, jsonify

from app_core.models import UserToken, User, HistoryPassChange
from app_core.modules.web.users.user_helper import validate_token, generate_token
from config import REGEX_USERNAME, REGEX_PASSWORD

_logger = logging.getLogger(__name__)

user = Blueprint('user', __name__)


@user.route('/api/change-password', methods=['POST'])
def change_password():
    """
    Nhận request từ Client về việc thay đổi mật khẩu
    :return: Trả về thông báo cho client
    :rtype: Object
    """
    format_response = {
        "error": {
            "code": 0,
            "message": ""
        },
        "data": {}
    }
    if request.method == 'POST':
        if not 'access_token' in request.cookies:
            format_response['error']['code'] = 2
            format_response['error']['message'] = 'Không có Token!'
            return jsonify(format_response), 401

        data = request.get_json()
        if data['oldPassword'] is None or data['newPassword'] is None or data['newPasswordConfirm'] is None:
            format_response['error']['code'] = 1
            format_response['error']['message'] = 'Request sai định dạng'
            return jsonify(format_response), 400

        current_user = UserToken.get_user_by_token(request.cookies['access_token'])
        current_user_id = UserToken.get_user_id_by_token(request.cookies['access_token'])
        if current_user_id is None or current_user is None:
            format_response['error']['code'] = 1
            format_response['error']['message'] = 'Sai Token hoặc Token hết hạn!'
            return jsonify(format_response), 401

        if not HistoryPassChange.check_current_password(current_user_id, data['oldPassword']):
            format_response['error']['code'] = 1
            format_response['error']['message'] = 'Sai password'
            return jsonify(format_response), 403
        elif data['newPassword'] != data['newPasswordConfirm']:
            format_response['error']['code'] = 1
            format_response['error']['message'] = 'Password không giống nhau'
            return jsonify(format_response), 400
        elif not HistoryPassChange.check_history_password(current_user_id, data['newPassword']):
            format_response['error']['code'] = 1
            format_response['error']['message'] = 'Mật khẩu không được giống với 5 mật khẩu gần nhất'
            return jsonify(format_response), 403

        if re.match(REGEX_PASSWORD, data['newPassword'], re.MULTILINE | re.VERBOSE) is None:
            format_response['error']['code'] = 1
            format_response['error']['message'] = 'Password không đúng định dạng'
            return jsonify(format_response)

        User.change_password(current_user, data['newPassword'])
        HistoryPassChange.add_password(current_user_id, data['newPassword'])

        return jsonify(format_response), 200
