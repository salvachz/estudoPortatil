from django.conf.urls import url, include
from django.views.static import serve
from hack import settings

import views

urlpatterns = [
    url('/',serve, {
            'document_root': 'static/','path': 'index.html'}),
    url(r'^',serve, {
            'document_root': 'static/','path': 'index.html'}),
    url(r'static/(?P<path>.*)$',serve, {
            'document_root': 'static/'}),

]
