from django.conf.urls import url, include
from django.views.static import serve
from hack import settings

urlpatterns = [
    url('auth/', include('rest_framework.urls', namespace='rest_framework'))
]
