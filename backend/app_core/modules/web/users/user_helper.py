from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

from config import SECRET_KEY


def validate_token(token):
    s = Serializer(SECRET_KEY)
    try:
        data = s.loads(token)
    except SignatureExpired:
        return None  # valid token, but expired
    except BadSignature:
        return None  # invalid token
    return data


def generate_token(user, expiration=1800):
    s = Serializer(SECRET_KEY, expires_in=expiration)
    token = s.dumps({
        'id': user.id,
        'email': user.email,
    }).decode('utf-8')
    return token
