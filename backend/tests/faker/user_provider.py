# coding=utf-8
import faker.providers

# from app_core import models
from app_core.models import User, db
from tests.faker import fake


class UserProvider(faker.providers.BaseProvider):
    """provide test data related to a user"""

    @staticmethod
    def user(password):
        username = "Test1" + fake.str()
        email = fake.str() + "@gmail.com"
        user = User(username=username, email=email, password=password)
        user.is_active = 1
        user.is_admin = 1

        db.session.add(user)
        db.session.flush()
        return user
