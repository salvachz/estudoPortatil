from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.utils import timezone
from estudo_portatil.models import UserProfile
from estudo_portatil.serializers import UserProfileSerializer

class UserProfileView(APIView):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.AllowAny,)

    queryset = UserProfile.objects.all()

    def get(self, request, format=None):
        if not request.user:
            return Response({'errors':['empty data']}, status=404)

        userProfileSerialized = UserProfileSerializer(request.user)
        return Response(userProfileSerialized.data)

    def post(self, request, format=None):
        data = request.data
        userProfileSerialized = UserProfileSerializer(data)
        errors = []
        print 'data',data
        if not data.get('email',None):
            errors.append('email missed')
        if not data.get('name',None):
            errors.append('name missed')
        if not data.get('passwd',None) or not data.get('conf_passwd',None) or data.get('passwd',None) != data.get('conf_passwd',None):
            errors.append('passwd missmatch or empty')
        if not data.get('bairro',None):
            errors.append('bairro missed')
        if not data.get('escola',None):
            errors.append('escola missed')
        if not data.get('ano_letivo',None):
            errors.append('serie missed')
        if errors:
            return Response({'errors':errors},404)
        user = UserProfile.objects.create_user(
            data['email'],
            data['name'],
            data['passwd'],
        )
        user.bairro = data['bairro']
        user.escola = data['escola']
        user.ano_letivo = data['ano_letivo']
        user.save()
        print 'userProfileSerialized',userProfileSerialized
        return Response(userProfileSerialized.data)
