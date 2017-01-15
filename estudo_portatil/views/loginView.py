# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from hack.lib import FacebookToken

from django.utils import timezone
from django.contrib.auth import authenticate, login, logout

from estudo_portatil.models import UserProfile
from estudo_portatil.serializers import UserProfileSerializer

class LoginView(APIView):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.AllowAny,)

    queryset = UserProfile.objects.all()

    def post(self, request, format=None):
        if request.user.is_authenticated():
            return Response({'login':True, 'msg':'Already logged'}, status=200)

        username = request.data.get('username', None)
        password = request.data.get('password', None)
        fb_token = request.data.get('fb_token', None)

        #profile account by facebook
        if fb_token:
            has_email = True
            facebookToken = FacebookToken(fb_token)
            if not facebookToken.is_valid():
                return Response({'login':False, 'msg':'fb_token invalido'},status=403)

            data = facebookToken.get_fb_user_data()
            print 'data',data
            user, created = UserProfile.objects.get_or_create(facebook_id=data['id'])
            print 'user created'
            user.last_login = timezone.now()
            if created:
                user.name = data['name']
            if not user.image:
                image = facebookToken.get_fb_user_image()
                userSerialized = UserProfileSerializer(user, data={'image':image}, partial=True)
                if userSerialized.is_valid():
                    userSerialized.save()
            if not user.email:
                user.email = '%s@facebook.com' % data['id']
                user.set_password('0496874809')
                has_email = False
            user.save()
            profile = authenticate(username=user.email, password='0496874809')
            login(request, profile)
            if not has_email:
                user.email = ''
                user.set_password(None)
                user.save()

            return Response({'login':True, 'msg':'logado FB com sucesso'}, status=200)

        #profile account by Lyra
        profile = authenticate(username=username, password=password)
        if profile is None:
            return Response({'login':False, 'msg':'email/senha não encontrados!'}, status=200)

        login(request, profile)
        return Response({'login':True, 'msg':'logado com sucesso'}, status=200)


    def get(self, request, format=None):
        if not request.user.is_authenticated():
            return Response({'login':False, 'msg':'Not Logged In'}, status=200)
        return Response({'login':True, 'msg':'Already Logged'}, status=200)

    def delete(self, request, format=None):
        logout(request)
        return Response({'login':True, 'msg':'Logged out with success'}, status=200)
