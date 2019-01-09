# coding=utf-8

import logging

from tests.faker import fake

_logger = logging.getLogger(__name__)


def test_login():
    password = "Test1" + fake.str()
    user = fake.user(password=password)
    data = user.get_user_by_username_password(username=user.username, password=password)
    assert not data is None

