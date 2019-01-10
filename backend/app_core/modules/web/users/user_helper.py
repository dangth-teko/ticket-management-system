# coding=utf-8
import datetime
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer)

from app_core.models import UserToken, db, SignupRequest, User, HistoryPassChange
from config import SECRET_KEY
from flask_mail import Message

from flask_mail import Mail

mail = Mail()


# def validate_token(token):
#     """Validate token
#         :param token
#         """
#     token = UserToken.query.filter_by(token=token).first()
#     if token:
#         if token.expired_time > datetime.datetime.now():
#             return token.user
#         else:
#             db.session.delete(token)
#             db.session.flush()
#     return None


def generate_token(user, expiration=1800):
    """
            generate token.
            :param user:
            :return token:
            """
    if isinstance(user, dict):
        email = user['email']
    else:
        email = user.email
    s = Serializer(SECRET_KEY, expires_in=expiration)
    token = s.dumps({
        'email': email,
    }).decode('utf-8')
    return token


def validate_signup_request_token(token):
    """
    validate token for user chua active
    :param token:
    :return:
    """
    request = SignupRequest.query.filter_by(user_token_confirm=token).first()
    if request:
        if request.expired_time > datetime.datetime.now():
            user = User(request.username, request.email, request.password)
            db.session.add(user)
            db.session.delete(request)
            db.session.commit()
            password = HistoryPassChange(user.id, request.password)
            password.user = user
            db.session.add(password)
            db.session.commit()
            return user
        else:
            db.session.delete(request)
            db.session.flush()
    return None


def send_email(to, subject, template):
    """
    Gui email
    :param to:
    :param subject:
    :param template:
    :return:
    """
    msg = Message(
        subject,
        recipients=[to],
        html=template,
        sender='dsh2t97@gmail.com'
    )
    mail.send(msg)
