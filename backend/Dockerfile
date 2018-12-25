# init
FROM python:3.6.7-alpine
ENV PYTHONUNBUFFERED 1
RUN mkdir /backend
RUN mkdir /log

EXPOSE 5000

WORKDIR /backend

# setup
RUN apk update
RUN apk upgrade
RUN apk add libffi-dev python-dev --no-cache
RUN apk --no-cache add \
    bash \
    postgresql-client \
    postgresql-dev \
    build-base \
    gettext
RUN pip3 install --upgrade pip
ADD requirements.txt /backend/
RUN pip3 install -r requirements.txt

# clean
RUN apk del -r postgresql
ADD . /backend/
