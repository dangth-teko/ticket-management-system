# coding=utf-8

import logging
import pytest
import http.client
from app_core.models import User, UserToken, HistoryWrongPass, db
from app_core.modules.web.users.user_helper import generate_token
from tests.faker import fake

_logger = logging.getLogger(__name__)


def test_login():
    password1 = "Test1" + fake.str()
    password2 = User.hash_password(password1)
    user = fake.user(password=password2)
    data = User.get_user_by_username_password(username=user.username, password=password1)
    assert not data is None
    token = generate_token(user=data)
    UserToken.insert_token(token, user.id)
    data2 = UserToken.get_user_by_token(token=token)
    assert not data2 is None
    data3 = HistoryWrongPass.insert_check_time(username=data2.username)
    assert data3['code'] in [1, 3]
    db.session.delete(user)
    db.session.commit()


@pytest.mark.skip
def _request(method, host, path, headers={}, data=[]):
    conn = http.client.HTTPSConnection(host, timeout=100)
    conn.request(method, path, data, headers)
    response = conn.getresponse()
    return response.read()
