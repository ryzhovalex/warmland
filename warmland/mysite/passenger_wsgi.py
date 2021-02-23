import os, sys
site_user_root_dir = '/home/d/d4rkof/minecraft-warmland.ru/public_html'
sys.path.insert(0, site_user_root_dir + '/warmland')
sys.path.insert(1, site_user_root_dir + '/venv/lib/python3.6/site-packages')
os.environ['DJANGO_SETTINGS_MODULE'] = 'mysite.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()