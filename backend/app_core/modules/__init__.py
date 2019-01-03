# coding=utf-8
import logging

_logger = logging.getLogger(__name__)
from app_core.modules.web import mail

def init_app(app, **kwargs):
    """
    Extension initialization point
    :param app:
    :param kwargs:
    :return:
    """
    from . import web
    web.init_app(app, **kwargs)
