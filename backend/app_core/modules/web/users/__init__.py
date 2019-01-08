# coding=utf-8
from app_core.modules.web.users.user_helper import validate_token, generate_token, send_email, mail, \
    validate_signup_request_token
import logging
import re
from flask import Blueprint, request, jsonify, render_template, url_for
from app_core.models import db, UserToken, User, HistoryWrongPass, SignupRequest
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
        if 'access_token' in request.cookies:
            data_token = validate_token(request.cookies['access_token'])
            format_response['data']['access_token'] = data_token
            return jsonify(format_response)

        matches_username = re.match(REGEX_USERNAME, data['username'], re.MULTILINE | re.VERBOSE)
        matches_password = re.match(REGEX_PASSWORD, data['password'], re.MULTILINE | re.VERBOSE)
        matches_verify_password = re.match(REGEX_PASSWORD, data['confirmPassword'], re.MULTILINE | re.VERBOSE)
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
                user_request = SignupRequest(username=data['username'], email=data['email'], password=passw, token=token)
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


@user.route('/confirm/<token>')
def confirm_email(token):
    """
    Active tai khoan qua email
    :param token:
    :return:
    """
    format_response = {
        "error": {"code": 0, "message": ""},
        "data": {}}
    user = validate_signup_request_token(token)
    if user is None:
        format_response['error']['code'] = 1
        format_response['error']['message'] = "Qúa hạn xác nhận email, mời quý khách đăng nhập lại!"
    return jsonify(format_response)


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
        if 'access_token' in request.cookies:
            user = UserToken.get_user_by_token(request.cookies['access_token'])
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
