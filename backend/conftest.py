# coding=utf-8
import logging
import pytest

from app_core import models

_logger = logging.getLogger(__name__)


@pytest.fixture(autouse=True)
def app(request):
    from app import app

    # Establish application context before running the test
    ctx = app.app_context()
    ctx.push()

    models.db.create_all()

    def teardown():
        models.db.session.remove()
        models.db.drop_all()
        ctx.pop()

    request.addfinalizer(teardown)
    return app
