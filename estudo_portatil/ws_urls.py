from django.conf.urls import url, include
from django.views.static import serve
from hack import settings
from estudo_portatil import views

urlpatterns = [
    url('auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^category/', views.CategoryViewSet.as_view({
        'get':'list'
    })),
    url(r'^wording/$', views.WordingViewSet.as_view({
        'get':'list'
    })),
    url(r'^wording/(?P<pk>[0-9]+)/$', views.WordingViewSet.as_view({
        'get':'retrive'
    })),

]
