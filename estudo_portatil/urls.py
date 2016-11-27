from django.conf.urls import url, include
from django.views.static import serve
from hack import settings

urlpatterns = [
    url('/',serve, {
            'document_root': 'static/','path': 'index.html'}),
    url(r'^portal/',serve, {
            'document_root': 'static/','path': 'index.html'}),
    url(r'^portal/',serve, {
            'document_root': 'static/','path': 'index.html'}),
    url(r'static/(?P<path>.*)$',serve, {
            'document_root': 'static/'}),
    url(r'^ws/auth/', include('rest_framework.urls', namespace='rest_framework'))
]
