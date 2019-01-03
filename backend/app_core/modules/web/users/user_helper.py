# import datetime

from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer)

# from app_core.models import UserToken, db
from config import SECRET_KEY


def generate_token(user, expiration=1800):
    s = Serializer(SECRET_KEY, expires_in=expiration)
    token = s.dumps({
        'id': user.id,
        'email': user.email,
    }).decode('utf-8')
    return token
