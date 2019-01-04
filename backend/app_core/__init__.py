# app.py
import logging
import os
import flask
import config
import logging.config

from . import models, modules

from app_core.modules import mail

_logger = logging.getLogger(__name__)

LOG_DIR = os.path.join(config.ROOT_DIR, 'var', 'log')
LOG_FILE = os.path.join(LOG_DIR, 'ticket-app.log')


def create_app():
    """
    Create Flask application based on env_name
    :rtype: flask.Flask
    """

    def load_app_config(app):
        """
        Load application's configurations
        :param flask.Flask app:
        :return:
        """
        instance_config_file = 'config_%s.py' % config.ENV_MODE.lower()
        app.config.from_object(config)
        app.config.from_pyfile('config.py', silent=True)
        app.config.from_pyfile(instance_config_file, silent=True)
        app.static_folder = config.STATIC_FOLDER

        app.config['MAIL_SERVER'] = 'smtp.gmail.com'
        app.config['MAIL_PORT'] = 465
        app.config['MAIL_USERNAME'] = 'dsh2t97@gmail.com'
        app.config['MAIL_PASSWORD'] = 'bfddkhht'
        app.config['MAIL_USE_TLS'] = False
        app.config['MAIL_USE_SSL'] = True

    app = flask.Flask(
        __name__,
        instance_relative_config=True,
        instance_path=os.path.join(config.ROOT_DIR, 'instance')
    )
    load_app_config(app)

    # setup logging
    logging.config.fileConfig(
        config.LOGGING_FILE_CONFIG,
        defaults={'filename': LOG_FILE},
        disable_existing_loggers=False
    )

    app.secret_key = config.SECRET_KEY

    # Sub-modules initialization
    models.init_app(app)
    modules.init_app(app)
    mail.init_app(app)

    return app


app = create_app()
