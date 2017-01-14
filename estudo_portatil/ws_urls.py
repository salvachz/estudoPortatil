from django.conf.urls import url, include
from django.views.static import serve
from hack import settings
from estudo_portatil import views

urlpatterns = [
    url(r'^auth/$', views.LoginViewSet.as_view({
        'get': 'get',
        'post': 'login'
    })),
    url(r'^category/', views.CategoryViewSet.as_view({
        'get':'list'
    })),
    url(r'^wording/$', views.WordingViewSet.as_view({
        'get':'list',
        'post':'create'
    })),
    url(r'^wording/(?P<pk>[0-9]+)/$', views.WordingViewSet.as_view({
        'get':'retrive'
    })),
    url(r'^correction/$', views.CorrectionViewSet.as_view({
        'post':'create',
    })),
    url(r'^correction/(?P<pk>[0-9]+)/$', views.CorrectionViewSet.as_view({
        'get':'retrive',
    })),
    url(r'^create_account/$', views.UserProfileView.as_view()),

]
