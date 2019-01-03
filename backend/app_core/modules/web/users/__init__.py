# coding=utf-8
import logging
import re

from flask import Blueprint, request, jsonify

# from app_core.models import db, Post
from app_core.models import UserToken, User, HistoryWrongPass
from app_core.modules.web.users.user_helper import generate_token
from config import REGEX_USERNAME, REGEX_PASSWORD, FORMAT_RESPONSE

_logger = logging.getLogger(__name__)

user = Blueprint('user', __name__)


@user.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        if 'access_token' in data:
            user = UserToken.get_user_by_token(data['access_token'])
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
