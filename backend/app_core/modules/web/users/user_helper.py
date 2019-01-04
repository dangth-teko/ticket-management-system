# coding=utf-8
import datetime

from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer)

from app_core.models import UserToken, db, SignupRequest, User
from config import SECRET_KEY
from flask_mail import Message

from flask_mail import Mail

mail = Mail()


def validate_token(token):
    token = UserToken.query.filter_by(token=token).first()
    if token:
        if token.expired_time > datetime.datetime.now():
            return token.user
        else:
            db.session.delete(token)
            db.session.flush()
    return None


def generate_token(user, expiration=1800):
    """
            generate token.
            :param user:
            :return token:
            """
    s = Serializer(SECRET_KEY, expires_in=expiration)
    token = s.dumps({
        'id': user.id,
        'email': user.email,
    }).decode('utf-8')
    return token


def generate_email_token(email):
    s = Serializer(SECRET_KEY)
    token = s.dumps({
        'email': email
    }).decode('utf-8')
    return token


def validate_email_token(token):
    # print(token)
    token = SignupRequest.query.filter_by(user_token_confirm=token).first()
    if token:
        if token.expired_time > datetime.datetime.now():
            user = User(token.username, token.email, token.password)
            db.session.add(user)
            db.session.delete(token)
            db.session.commit()
            print(user)
            return user
        else:
            db.session.delete(token)
            db.session.flush()
    return None


def send_email(to, subject, template):
    msg = Message(
        subject,
        recipients=[to],
        html=template,
        sender='dsh2t97@gmail.com'
    )
    mail.send(msg)
