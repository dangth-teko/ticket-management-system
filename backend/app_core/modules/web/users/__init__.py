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
        FORMAT_RESPONSE = {
            "error": {"code": 0, "message": ""},
            "data": {}}
        data = request.get_json()
        if 'access_token' in request.cookies:
            data_token = validate_token(request.cookies['access_token'])
            FORMAT_RESPONSE['data']['access_token'] = data_token
        else:
            matches_username = re.match(REGEX_USERNAME, data['username'], re.MULTILINE | re.VERBOSE)
            matches_password = re.match(REGEX_PASSWORD, data['password'], re.MULTILINE | re.VERBOSE)
            matches_verify_password = re.match(REGEX_PASSWORD, data['confirmPassword'], re.MULTILINE | re.VERBOSE)
            if matches_password != None and matches_verify_password != None and matches_username != None:
                if data['password'] != data['confirmPassword']:
                    FORMAT_RESPONSE['error']['code'] = 1
                    FORMAT_RESPONSE['error']['message'] = "Mật khẩu không khớp!"
                else:
                    user = User.get_user_by_username_or_email(data['username'], data['email'])
                    if user != None:
                        FORMAT_RESPONSE['error']['code'] = 1
                        FORMAT_RESPONSE['error']['message'] = "Email hoặc username đã tồn tại!"
                        passw = data['password']
                        token = generate_token(data)
                        user_request = SignupRequest(username=data['username'], email=data['email'],
                                                     password=passw,
                                                     token=token)
                        confirm_url = url_for('user.confirm_email', token=token, _external=True)
                        html = render_template('activate_email.html', confirm_url=confirm_url)
                        subject = "Please confirm your email"
                        send_email(user_request.email, subject, html)
                        db.session.add(user_request)
                        db.session.commit()
                        FORMAT_RESPONSE['data']['access_token'] = token
            elif matches_password == None:
                FORMAT_RESPONSE['error']['code'] = 1
                FORMAT_RESPONSE['error']['message'] = "Sai định dạng password!"
            elif matches_username == None:
                FORMAT_RESPONSE['error']['code'] = 1
                FORMAT_RESPONSE['error']['message'] = "Sai định dạng username"
            elif matches_username == None:
                FORMAT_RESPONSE['error']['code'] = 1
                FORMAT_RESPONSE['error']['message'] = "Sai định dạng verify password!"
        return jsonify(FORMAT_RESPONSE)


@user.route('/confirm/<token>')
def confirm_email(token):
    """
    Active tai khoan qua email
    :param token:
    :return:
    """
    FORMAT_RESPONSE = {
        "error": {"code": 0, "message": ""},
        "data": {}}
    user = validate_signup_request_token(token)
    if user == None:
        FORMAT_RESPONSE['error']['code'] = 1
        FORMAT_RESPONSE['error']['message'] = "Qúa hạn xác nhận email, mời quý khách đăng nhập lại!"
    return jsonify(FORMAT_RESPONSE)


@user.route('/api/signin', methods=['GET', 'POST'])
def login():
    """
    Dang nhap
    :return:
    """
    FORMAT_RESPONSE = {
        "error": {"code": 0, "message": ""},
        "data": {}}
    if request.method == 'POST':
        data = request.get_json()
        if 'access_token' in request.cookies:
            user = UserToken.get_user_by_token(request.cookies['access_token'])
            if user:
                FORMAT_RESPONSE['data'] = {'access_token': user,
                                           'profile': {'email': user.email, 'username': user.username}}
            else:
                FORMAT_RESPONSE['error']['code'] = 1
                FORMAT_RESPONSE['error']['message'] = 'Sai access token hoặc hết hạn!'
        elif 'username' in data and 'password' in data:
            matches_username = re.match(REGEX_USERNAME, data['username'], re.MULTILINE | re.VERBOSE)
            matches_password = re.match(REGEX_PASSWORD, data['password'], re.MULTILINE | re.VERBOSE)
            if matches_password != None and matches_username != None:
                user = User.get_user_by_username_password(data['username'], data['password'])
                if user:
                    token = generate_token(user)
                    UserToken.insert_token(token, user.id)
                    FORMAT_RESPONSE['data'] = {'token': token,
                                               'profile': {'username': user.username,
                                                           'email': user.email}}
                else:
                    FORMAT_RESPONSE['error'] = HistoryWrongPass.insert_check_time(data['username'])
            else:
                FORMAT_RESPONSE['error']['code'] = 1
                FORMAT_RESPONSE['error']['message'] = "Sai định dạng username/password!"
        return jsonify(FORMAT_RESPONSE)
