# init
FROM python:3.6.7-alpine
ENV PYTHONUNBUFFERED 1
RUN mkdir /backend
RUN mkdir /log
WORKDIR /backend

# setup
RUN apk update
RUN apk upgrade
RUN apk --no-cache add \
    postgresql-client \
    postgresql-dev \
    build-base \
    gettext
RUN pip3 install --upgrade pip
ADD requirements.txt /backend/
RUN pip3 install -r requirements.txt
COPY ./wait-for-it.sh /backend
RUN chmod +x wait-for-it.sh

# clean
RUN apk del -r postgresql
ADD . /backend/
