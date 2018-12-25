# coding=utf-8
import logging
import flask
from flask import Blueprint, render_template, request

from app_core.models import db, Post
from app_core.modules.web.users import user

_logger = logging.getLogger(__name__)

web = Blueprint('sample', __name__)


def init_app(app, **kwargs):
    """
    Extension initialization point
    :param flask.Flask app:
    :param kwargs:
    :return:
    """
    app.register_blueprint(web)
    app.register_blueprint(user)


@web.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        text = request.form['text']
        post = Post(text)
        db.session.add(post)
        db.session.commit()
    posts = Post.query.order_by(Post.date_posted.desc()).all()
    return render_template('index.html', posts=posts)
