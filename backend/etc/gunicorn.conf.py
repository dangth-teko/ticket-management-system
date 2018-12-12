# coding=utf-8
import logging
import multiprocessing
import os

_logger = logging.getLogger(__name__)

_ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__),
    '..',
))

VAR_DIR = os.path.join(_ROOT, 'var')
ETC_DIR = os.path.join(_ROOT, 'etc')

bind = '127.0.0.1:5000'
workers = multiprocessing.cpu_count() * 2 + 1

timeout = 180  # 3 minutes
keepalive = 24 * 3600  # 1 day
logconfig = os.path.join(ETC_DIR, 'logging.ini')
