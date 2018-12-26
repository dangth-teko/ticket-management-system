# coding=utf-8
# import json
import logging
# import flask
import re

from flask import Blueprint, render_template, request, jsonify

# from app_core.models import db, Post
from app_core.models import UserToken
from app_core.models.user import User
from app_core.modules.web.users.user_helper import validate_token, generate_token
from config import REGEX_USERNAME, REGEX_PASSWORD

_logger = logging.getLogger(__name__)

user = Blueprint('user', __name__)


@user.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        if 'access_token' in request.cookies:
            data_token = validate_token(request.cookies['access_token'])
            return jsonify({'access_token': data_token})
        elif 'username' in data and 'password' in data:
            matches_username = re.match(REGEX_USERNAME, data['username'], re.MULTILINE | re.VERBOSE)
            matches_password = re.match(REGEX_PASSWORD, data['password'], re.MULTILINE | re.VERBOSE)
            if matches_password != None and matches_username != None:
                user = User.get_user_by_username_password(data['username'], data['password'])
                if user:
                    token = generate_token(user)
                    UserToken.insert_token(token, user.id)
                    return jsonify({'token': token})
                else:
                    return None
            else:
                return jsonify({'noti': "Sai dinh dang"})
