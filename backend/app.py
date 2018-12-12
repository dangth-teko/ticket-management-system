# app.py
import logging

_logger = logging.getLogger(__name__)

from app_core import app

if __name__ == '__main__':
    app.run()
