# coding=utf-8
# import json
import logging
# import flask
from flask import Blueprint, render_template, request

# from app_core.models import db, Post
from app_core.models.user import User
from app_core.modules.web.users.user_helper import validate_token, generate_token

_logger = logging.getLogger(__name__)

user = Blueprint('user', __name__)


@user.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        if 'access_token' in data:
            data_token = validate_token(data['access_token'])
            if data_token:
                return data_token
            else:
                return "0"
        elif 'username' in data and 'password' in data:
            user = User.get_user(data['username'], data['password'])
            if user:
                return generate_token(user)
            else:
                return "0"
