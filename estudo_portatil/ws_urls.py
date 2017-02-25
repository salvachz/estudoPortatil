from django.conf.urls import url, include
from django.views.static import serve
from hack import settings
from estudo_portatil import views

urlpatterns = [
    url(r'^auth/$', views.LoginView.as_view()),
    url(r'^category/', views.CategoryViewSet.as_view({
        'get':'list'
    })),
    url(r'^wording/$', views.WordingViewSet.as_view({
        'get':'list',
        'post':'create'
    })),
    url(r'^feedback/$', views.FeedbackViewSet.as_view({
        'post':'send'
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
    url(r'^create_account/$', views.UserProfileViewSet.as_view({
        'post': 'create'
    })),
    url(r'^me/$', views.UserProfileViewSet.as_view({
        'get': 'me'
    })),

]
