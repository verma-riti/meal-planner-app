"""dashboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from api.views.authentication import SignUpView, LoginView, LogoutView
from api.views.meals import get_meals, add_meal, update_meal, delete_meal, search_meals

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^signUp/', SignUpView.as_view()),
    url(r'^login/', LoginView.as_view()),
    url(r'^logout/', LogoutView.as_view()),
    url(r'^get_meals', get_meals),
    url(r'^add_meal/', add_meal),
    url(r'^search_meals/', search_meals),
    url(r'^update_meal/(?P<meal_id>\d+)/$', update_meal),
    url(r'^delete_meal/(?P<meal_id>\d+)/$', delete_meal),
]
