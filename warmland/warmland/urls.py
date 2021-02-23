from django.urls import path

from . import views


app_name = 'warmland'
urlpatterns = [
    path('', views.home, name='home'),
    path('market/', views.market, name='market'),
    path('blog/', views.blog, name='blog'),
    path('about/', views.about, name='about'),
]