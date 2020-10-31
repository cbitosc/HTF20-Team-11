from django.urls import path
from . import views

urlpatterns=[
    path('login',views.login),
    path('home/<int:user_id>/',views.home),
    path('authenticate_login', views.authenticate),
    path('profile/<int:user_id>/',views.profile),
]
r'^article/(\d+)/'