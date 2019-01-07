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
    format_response = {
        "error": {
            "code": 0,
            "message": ""
        },
        "data": {}
    }
    if request.method == 'POST':
        if 'access_token' in request.cookies:
            data = request.get_json()
            current_user = UserToken.get_user_by_token(request.cookies['access_token'])
            if current_user:
                if data is None or \
                        data['oldPassword'] is None or \
                        data['newPassword'] is None or \
                        data['newPasswordConfirm'] is None:
                    format_response['error']['code'] = 1
                    format_response['error']['message'] = 'Request sai định dạng'
                elif not HistoryPassChange.check_password(current_user.id, data['oldPassword']):
                    format_response['error']['code'] = 1
                    format_response['error']['message'] = 'Sai password'
                elif data['newPassword'] != data['newPasswordConfirm']:
                    format_response['error']['code'] = 1
                    format_response['error']['message'] = 'Password không giống nhau'
                elif not HistoryPassChange.check_history_password(current_user.id, data['newPassword']):
                    format_response['error']['code'] = 1
                    format_response['error']['message'] = 'Mật khẩu không được giống với 5 mật khẩu gần nhất'
                else:
                    matches_password = re.match(REGEX_PASSWORD, data['newPassword'], re.MULTILINE | re.VERBOSE)
                    if matches_password is not None:
                        User.change_password(current_user, data['newPassword'])
                        HistoryPassChange.add_password(current_user.id, data['newPassword'])
                    else:
                        format_response['error']['code'] = 1
                        format_response['error']['message'] = 'Password không đúng định dạng'
            else:
                format_response['error']['code'] = 1
                format_response['error']['message'] = 'Sai Token hoặc Token hết hạn!'
        else:
            format_response['error']['code'] = 2
            format_response['error']['message'] = 'Không có Token!'
        return jsonify(format_response)
