# coding=utf-8
import logging
import flask
import flask_sqlalchemy as _fs
import flask_migrate

_logger = logging.getLogger(__name__)

db = _fs.SQLAlchemy()
migrate = flask_migrate.Migrate(db=db)


def init_app(app, **kwargs):
    """
    Extension initialization point
    :param flask.Flask app:
    :param kwargs:
    :return:
    """
    db.app = app
    db.init_app(app)
    migrate.init_app(app)
    _logger.info('Start app with database: %s' %
                 app.config['SQLALCHEMY_DATABASE_URI'])
    # db.create_all()

from .base_model import BaseModel
from .post import Post
from .user import User
from .action import Action
from .history_pass_change import HistoryPassChange
from .history_wrong_pass import HistoryWrongPass
from .logging import Logging
from .signup_request import SignupRequest
from .user_token import UserToken
