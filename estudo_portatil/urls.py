from django.conf.urls import url
from django.views.static import serve
from hack import settings

urlpatterns = [
    url(r'^$',serve, {
            'document_root': settings.STATIC_ROOT,'path': 'index.html'}),
    url(r'(?P<path>.*)$',serve, {
            'document_root': 'static/'}),
]
