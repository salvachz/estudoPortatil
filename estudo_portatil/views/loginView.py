from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.utils import timezone
from estudo_portatil.models import UserProfile

class LoginView(APIView):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.IsAuthenticated,)

    queryset = UserProfile.objects.all()

    def get(self, request, format=None):
        if not request.user:
            return Response({'errors':['wrong user/pass']}, status=200)
        response = Response({'msg':['logged']}, status=200)
        response.set_cookie('is_logged', 'True')
        return response

