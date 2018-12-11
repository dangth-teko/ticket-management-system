echo "hello world"
python3 manage.py db upgrade
gunicorn -w 3 -b 0.0.0.0:8000 app:app
echo "VFF like shit"
