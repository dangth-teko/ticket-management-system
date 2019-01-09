# coding=utf-8
from app_core.modules.web.users.user_helper import generate_token, send_email, mail, \
    validate_signup_request_token
import logging
import re

from flask import Blueprint, request, jsonify, render_template, url_for
from app_core.models import db, UserToken, User, HistoryWrongPass, SignupRequest, HistoryPassChange
# from app_core.modules.web.users.user_helper import , generate_token

from config import REGEX_USERNAME, REGEX_PASSWORD

_logger = logging.getLogger(__name__)

user = Blueprint('user', __name__)


@user.route('/api/signup', methods=['GET', 'POST'])
def register():
    """
    Dang ky
    :return:
    """
    if request.method == 'POST':
        format_response = {
            "error": {
                "code": 0,
                "message": ""
            },
            "data": {}
        }
        data = request.get_json()
        matches_username = re.match(REGEX_USERNAME, data['username'], re.MULTILINE | re.VERBOSE)
        matches_password = re.match(REGEX_PASSWORD, data['password'], re.MULTILINE | re.VERBOSE)
        matches_verify_password = re.match(REGEX_PASSWORD, data['confirmPassword'], re.MULTILINE | re.VERBOSE)
        try:
            if matches_password is not None and matches_verify_password is not None and matches_username is not None:
                if data['password'] != data['confirmPassword']:
                    format_response['error']['code'] = 1
                    format_response['error']['message'] = "Mật khẩu không khớp!"
                    return jsonify(format_response)

                user = User.get_user_by_username_or_email(data['username'], data['email'])
                if user is not None:
                    format_response['error']['code'] = 1
                    format_response['error']['message'] = "Email hoặc username đã tồn tại!"
                else:
                    passw = data['password']
                    token = generate_token(data)
                    user_request = SignupRequest(username=data['username'], email=data['email'], password=passw,
                                                 token=token)
                    confirm_url = url_for('user.confirm_email', token=token, _external=True)
                    html = render_template('activate_email.html', confirm_url=confirm_url)
                    subject = "Please confirm your email"
                    send_email(user_request.email, subject, html)
                    db.session.add(user_request)
                    db.session.commit()
                    format_response['data']['access_token'] = token
            elif matches_password is None:
                format_response['error']['code'] = 1
                format_response['error']['message'] = "Sai định dạng password!"
            elif matches_username is None:
                format_response['error']['code'] = 1
                format_response['error']['message'] = "Sai định dạng username"
            elif matches_verify_password is None:
                format_response['error']['code'] = 1
                format_response['error']['message'] = "Sai định dạng verify password!"
            return jsonify(format_response)
        except Exception as e:
            _logger.error(e)
            db.session.rollback()
            return jsonify({"error": {"code": 1, "message": "Internal server error!"},
                            "data": {}}), 500


@user.route('/confirm/<token>')
def confirm_email(token):
    """
    Active tai khoan qua email
    :param token:
    :return:
    """
    try:
        format_response = {
            "error": {"code": 0, "message": ""},
            "data": {}}
        user = validate_signup_request_token(token)
        if user is None:
            format_response['error']['code'] = 1
            format_response['error']['message'] = "Qúa hạn xác nhận email, mời quý khách đăng nhập lại!"
        return jsonify(format_response)
    except Exception as e:
        _logger.error(e)
        db.session.rollback()
        return jsonify({"error": {"code": 1, "message": "Internal server error!"},
                        "data": {}}), 500


@user.route('/api/signin', methods=['GET', 'POST'])
def login():
    """
    Dang nhap
    :return:
    """
    format_response = {
        "error": {"code": 0, "message": ""},
        "data": {}}
    if request.method == 'POST':
        try:
            if 'Authorization' in request.headers:
                user = UserToken.get_user_by_token(request.headers['Authorization'])
                if user:
                    format_response['data'] = {'access_token': user,
                                               'profile': {'email': user.email, 'username': user.username}}
                else:
                    format_response['error']['code'] = 1
                    format_response['error']['message'] = 'Sai access token hoặc hết hạn!'
                return jsonify(format_response)

            data = request.get_json()
            if data['username'] is None or data['password'] is None:
                format_response['error']['code'] = 1
                format_response['error']['message'] = 'Request sai định dạng'
                return jsonify(format_response)

            matches_username = re.match(REGEX_USERNAME, data['username'], re.MULTILINE | re.VERBOSE)
            matches_password = re.match(REGEX_PASSWORD, data['password'], re.MULTILINE | re.VERBOSE)
            if matches_password is not None and matches_username is not None:
                user = User.get_user_by_username_password(data['username'], data['password'])
                if user:
                    token = generate_token(user)
                    UserToken.insert_token(token, user.id)
                    format_response['data'] = {'token': token,
                                               'profile': {'username': user.username,
                                                           'email': user.email}}
                else:
                    format_response['error'] = HistoryWrongPass.insert_check_time(data['username'])
            else:
                format_response['error']['code'] = 1
                format_response['error']['message'] = "Sai định dạng username/password!"
            return jsonify(format_response)
        except Exception as e:
            _logger.error(e)
            db.session.rollback()
            return jsonify({"error": {"code": 1, "message": "Internal server error!"},
                            "data": {}}), 500


@user.route('/api/change-password', methods=['GET', 'POST'])
def change_password():
    """
    Nhận request từ Client về việc thay đổi mật khẩu
    :return: Trả về thông báo cho client
    :rtype: Object
    """
    format_response = {
        "error": {
            "code": 0,
            "message": "Đổi password thành công!"
        },
        "data": {}
    }
    if request.method == 'POST':

        if not 'Authorization' in request.headers:

            format_response['error']['code'] = 2
            format_response['error']['message'] = 'Không có Token!'
            return jsonify(format_response)

        data = request.get_json()
        _logger.debug(data)

        if data['oldPassword'] is None or data['newPassword'] is None or data['newPasswordConfirm'] is None:
            format_response['error']['code'] = 1

            return jsonify(format_response)
        try:
            current_user = UserToken.get_user_by_token(request.headers['Authorization'])
            if current_user is None:
                format_response['error']['code'] = 1
                format_response['error']['message'] = 'Sai Token hoặc Token hết hạn!'
                return jsonify(format_response)
            else:
                if not HistoryPassChange.check_current_password(current_user.id, data['oldPassword']):
                    format_response['error']['code'] = 1
                    format_response['error']['message'] = 'Sai password'
                    return jsonify(format_response)
                elif data['newPassword'] != data['newPasswordConfirm']:
                    format_response['error']['code'] = 1
                    format_response['error']['message'] = 'Password không giống nhau'
                    return jsonify(format_response)
                elif not HistoryPassChange.check_history_password(current_user.id, data['newPassword']):
                    format_response['error']['code'] = 1
                    format_response['error']['message'] = 'Mật khẩu không được giống với 5 mật khẩu gần nhất'
                    return jsonify(format_response)

                if re.match(REGEX_PASSWORD, data['newPassword'], re.MULTILINE | re.VERBOSE) is None:
                    format_response['error']['code'] = 1
                    format_response['error']['message'] = 'Password không đúng định dạng'
                    return jsonify(format_response)
                User.change_password(current_user.id, data['newPassword'])
                UserToken.delete_all_token(current_user.id)
                HistoryPassChange.add_password(current_user.id, data['newPassword'])
            return jsonify(format_response)
        except Exception as e:
            _logger.error(e)
            db.session.rollback()
            return jsonify({"error": {"code": 1, "message": "Internal server error!"},
                            "data": {}}), 500


@user.route('/api/auth', methods=['POST', 'GET', 'OPTIONS'])
def index():
    format_response = {
        "error": {"code": 0, "message": ""},
        "data": {}}
    try:
        if 'Authorization' in request.headers:
            user = UserToken.get_user_by_token(request.headers['Authorization'])
            if user:
                return '', 200
            else:
                format_response['error']['code'] = 1
                format_response['error']['message'] = 'Sai access token hoặc hết hạn!'
        else:
            format_response['error']['code'] = 1
            format_response['error']['message'] = 'Không có token!'
        return '', 401
    except Exception as e:
        _logger.error(e)
        db.session.rollback()
        return '', 401


@user.route('/api/logout', methods=['POST', 'GET'])
def logout():
    try:
        if 'Authorization' in request.headers:
            UserToken.delete_token(request.headers['Authorization'])
        return '', 200
    except Exception as e:
        _logger.error(e)
        db.session.rollback()
        return '', 401
