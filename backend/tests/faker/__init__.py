# coding=utf-8
import random
import string

import faker.providers

fake = faker.Faker()


class TicketProvider(faker.providers.BaseProvider):

    @staticmethod
    def url():
        """
        Return a random url
        :return: a random url
        :rtype: string
        """
        urls = [
            'https://faker.readthedocs.io/en/master/',
            'https://www.tutorialspoint.com/python3/python_exceptions.htm',
            'https://docs.python.org/3.6/tutorial/errors.html'
        ]
        return random.choice(urls)

    @staticmethod
    def str(length=10):
        """
        Return a random string of length 10
        :return:
        """
        return ''.join(random.choice(string.ascii_letters)
                       for _ in range(length))


from .user_provider import UserProvider

fake.add_provider(TicketProvider)
fake.add_provider(UserProvider)
