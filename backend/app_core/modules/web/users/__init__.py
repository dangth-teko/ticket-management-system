# coding=utf-8
# import json
import logging
# import flask
import re

from flask import Blueprint, render_template, request, jsonify, url_for

# from app_core.models import db, Post
from app_core.models import UserToken, User, SignupRequest, db
from app_core.modules.web.users.user_helper import validate_token, generate_token,generate_email_token, validate_email_token, send_email, mail
from config import REGEX_USERNAME, REGEX_PASSWORD

_logger = logging.getLogger(__name__)

user = Blueprint('user', __name__)


@user.route('/register', methods = ['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        if 'access_token' in request.cookies:
            data_token = validate_token(request.cookies['access_token'])
            return jsonify({'access_token': data_token})
        else:
            matches_username = re.match(REGEX_USERNAME, data['username'], re.MULTILINE | re.VERBOSE)
            matches_password = re.match(REGEX_PASSWORD, data['password'], re.MULTILINE | re.VERBOSE)
            matches_verify_password = re.match(REGEX_PASSWORD, data['verify_password'], re.MULTILINE | re.VERBOSE)
            print(matches_username)
            print(matches_password)
            print(matches_verify_password)
            if matches_password != None and matches_verify_password != None and matches_username != None:
                if data['password'] != data['verify_password']:
                    return jsonify({'error': {
                            'code': 1,
                            'message':'Mat khau khong khop'
                        }})
                else:
                    user = User.get_user_by_username(data['username'])
                    print(user)
                    if user != None:
                        return jsonify({'error': {
                            'code': 1,
                            'message':'User da ton tai, xin moi tao tai khoan khac'
                        }})
                    else:
                        passw = data['password'].encode('utf-8')
                        password = User.hashed_password(passw)
                        token = generate_email_token(data['email'])
                        user_request = SignupRequest(username = data['username'], email = data['email'], password=password , token= token)
                        
                        confirm_url = url_for('user.confirm_email', token=token, _external=True)
                        print(confirm_url)
                        
                        html = render_template('activate_email.html', confirm_url=confirm_url)
                        subject = "Please confirm your email"
                        send_email(user_request.email, subject, html)
                        db.session.add(user_request)
                        db.session.commit()
                        return jsonify({'error': {
                            'code': 0,
                            'message':''
                        },
                            'data': token})
            elif matches_password == None:
                return  jsonify({'error': {
                            'code': 1,
                            'message':'Sai dinh dang password'
                        }})
            elif matches_username == None:
                return  jsonify({'error': {
                            'code': 1,
                            'message':'Sai dinh dang username'
                        }})
            elif matches_username == None:
                return  jsonify({'error': {
                            'code': 1,
                            'message':'Sai dinh dang verify password'
                        }})


@user.route('/confirm/<token>')
def confirm_email(token):
    user = validate_email_token(token)
    if user == None:
        return jsonify({'error': {
                            'code': 1,
                            'message':'Qua han dang ky, xin moi dang ky lai'
                        }})
    
    return jsonify({'error': {
                            'code': 0,
                            'message':''
                        },
                            'data': 'Success'})