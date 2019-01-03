# coding=utf-8
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer)

from config import SECRET_KEY


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
