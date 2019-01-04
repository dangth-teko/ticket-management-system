# coding=utf-8
import logging
import pytest
import http.client

from app_core.models import User, db
from tests.faker import fake

_logger = logging.getLogger(__name__)


def test_login():
    password = "Test1" + fake.str()
    user = fake.user(password=password.encode('utf-8'))
    data = {'username': user.username, 'password': password}
    data_test = _request("POST", 'localhost:5000', '/login', data)
    print(data_test)
    assert data_test != None


@pytest.mark.skip
def _request(method, host, path, headers={}, data=[]):
    conn = http.client.HTTPSConnection(host, timeout=100)
    conn.request(method, path, data, headers)
    response = conn.getresponse()
    return response.read()
