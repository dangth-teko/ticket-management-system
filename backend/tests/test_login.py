import logging
import pytest
import http.client

from app_core.models import User, db

_logger = logging.getLogger(__name__)


def test_login():
    user = User(username='xhuiklm10', email='thdang1003@gmail.com', password='Haidang97'.encode('utf-8'))
    db.session.add(user)
    db.session.flush()
    data = {'username': 'xhuiklm10', 'password': 'Haidang97'}
    data_test = _request("POST", 'localhost:5000', '/login', data)
    print(data_test)
    assert data_test != None


@pytest.mark.skip
def _request(method, host, path, headers={}, data=[]):
    conn = http.client.HTTPSConnection(host, timeout=100)
    conn.request(method, path, data, headers)
    response = conn.getresponse()
    return response.read()
