from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from django.utils import timezone
from django.contrib.auth import authenticate, login

from estudo_portatil.models import UserProfile

class LoginView(APIView):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.AllowAny,)

    queryset = UserProfile.objects.all()

    def post(self, request, format=None):
        print dir(request)
        if request.user.is_authenticated():
            return Response({'msg':['Already logged']}, status=200)

        username = request.data.get('username', None)
        password = request.data.get('password', None)

        profile = authenticate(username=username, password=password)

        if profile is None:
            response = Response({'error':['user not found']}, status=200)

        login(request, profile)
        response = Response({'msg':['success loged']}, status=200)

        return response

    def get(self, request, format=None):
        if not request.user:
            return Response({'errors':['wrong user/pass']}, status=200)
        response = Response({'msg':['logged']}, status=200)
        response.set_cookie('is_logged', 'True')
        return response
