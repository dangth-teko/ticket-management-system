# app.py
import logging

from flask_cors import CORS

_logger = logging.getLogger(__name__)

from app_core import app
# from flask_cors import CORS

cors = CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == '__main__':
    app.run()
