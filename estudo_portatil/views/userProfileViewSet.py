# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.utils import timezone
from django.contrib.auth import authenticate, login, logout
from estudo_portatil.models import UserProfile
from estudo_portatil.serializers import UserProfileSerializer

class UserProfileViewSet(viewsets.ModelViewSet):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.AllowAny,)

    queryset = UserProfile.objects.all()

    def me(self, request, format=None):
        if not request.user.is_authenticated():
            return Response({'errors':['empty data']}, status=403)

        userProfileSerialized = UserProfileSerializer(request.user)
        return Response(userProfileSerialized.data)

    def create(self, request, format=None):
        data = request.data
        errors = []
        print 'data',data
        if not data.get('email',None):
            errors.append('e-mail em branco')
        elif not self.__validateEmail(data['email']):
            errors.append('e-mail invalido')

        if not data.get('name',None):
            errors.append('Nome não foi preenchido')
        if not data.get('passwd',None) or not data.get('conf_passwd',None) or data.get('passwd',None) != data.get('conf_passwd',None):
            errors.append('senha nao confere ou está em branco')
        #if not data.get('bairro',None):
        #    errors.append('bairro em branco')
        #if not data.get('escola',None):
        #    errors.append('escola em branco')
        #if not data.get('ano_letivo',None):
        #    errors.append('serie em branco')
        if errors:
            return Response({'errors':errors},403)
        try:
            user = UserProfile.objects.create_user(
                data['email'],
                data['name'],
                data['passwd'],
            )
        except:
            errors.append('Este E-mail já está cadastrado!')
            return Response({'errors':errors},403)
        user.image = 'user-img/default.jpg'
        #user.bairro = data['bairro']
        #user.escola = data['escola']
        #user.ano_letivo = data['ano_letivo']
        user.save()

        #log in the profile
        profile = authenticate(username=user.email, password=data['passwd'])
        login(request, profile)

        return Response(UserProfileSerializer(user).data)

    def __validateEmail(self, email):
        from django.core.validators import validate_email
        try:
            validate_email( email )
            return True
        except:
            return False
