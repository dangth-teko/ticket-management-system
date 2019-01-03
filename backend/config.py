# config.py
import os

ROOT_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__)
    )
)

SECRET_KEY = '\xb8,\xef\xc9w\xb0\xc3Xv+\xa6\x852\xa6\\\x00\xd0\xea\x81\x99\xca\xd6\xb56'

LOGGING_FILE_CONFIG = os.path.join(ROOT_DIR, 'etc', 'logging.ini')
STATIC_FOLDER = os.path.join(ROOT_DIR, 'static')

# Environment to run config. This value will affect the configuration loading
ENV_MODE = os.getenv('ENV_MODE', '').upper()

SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_COMMIT_ON_TEARDOWN = True

POSTGRES_DB = os.getenv('POSTGRES_DB')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT')
SQLALCHEMY_DATABASE_URI = 'postgresql://{0}:{1}@{2}:{3}/{4}'.format(
    "postgres", "teko@123?", "172.18.0.2", "5432", "ticket"
)

# "postgres", "teko@123?", "172.18.0.2", "5432", "ticket"

REGEX_USERNAME = r"""^(?=(?:.*[A-Za-z]){1,})(?=(?:.*\d){1,})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{6,})$"""
REGEX_EMAIL = r"""[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}"""
REGEX_PASSWORD = r"""^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){1,})(?=(?:.*\d){1,})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{8,})$"""

FORMAT_RESPONSE = {
    "error": {"code": 0, "message": ""},
    "data": {}}
