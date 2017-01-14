# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from django.utils import timezone
from django.contrib.auth import authenticate, login

from estudo_portatil.models import UserProfile

class LoginView(APIView):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.AllowAny,)

    queryset = UserProfile.objects.all()

    def post(self, request, format=None):
        if request.user.is_authenticated():
            return Response({'login':True, 'msg':'Already logged'}, status=200)

        username = request.data.get('username', None)
        password = request.data.get('password', None)

        profile = authenticate(username=username, password=password)

        if profile is None:
            return Response({'login':False, 'msg':'email/senha não encontrados!'}, status=200)

        login(request, profile)
        return Response({'login':True, 'msg':'logado com sucesso'}, status=200)


    def get(self, request, format=None):
        if not request.user.is_authenticated():
            return Response({'login':False, 'msg':'Not Logged In'}, status=200)
        return Response({'login':True, 'msg':'Already Logged'}, status=200)
