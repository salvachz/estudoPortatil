# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.utils import timezone
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.contrib.auth import authenticate, login, logout
from estudo_portatil.models import UserProfile
from estudo_portatil.serializers import UserProfileSerializer
from hack.settings import BASE_TEMPLATES

import hashlib
import urllib
from datetime import datetime

class UserProfileViewSet(viewsets.ModelViewSet):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.AllowAny,)

    queryset = UserProfile.objects.all()

    def me(self, request, format=None):
        if not request.user.is_authenticated():
            return Response({'errors':['empty data']}, status=403)

        userProfileSerialized = UserProfileSerializer(request.user)
        return Response(userProfileSerialized.data)

    def confirmation_email(self, request, format=None):
        email = request.data.get('email',None)
        key  = request.data.get('key',None)
        print 'key',key
        print 'email',email
        if email and key:
            email = urllib.unquote(email)
            key = urllib.unquote(key)
            user = UserProfile.objects.filter(hashpass=key,email=email)
            if not user:
                return Response({'validated':False}, status=200)
            user = user[0]
            user.status = 'confirmed'
            user.save()
            print 'user',user
            return Response({'validated':True}, status=200)


        return Response({'validated':False}, status=200)

    def create(self, request, format=None):
        data = request.data
        errors = []
        print 'data',data
        if not data.get('email',None):
            errors.append('e-mail em branco')
        elif not self.__validate_email(data['email']):
            errors.append('e-mail invalido')

        if not data.get('name',None):
            errors.append('Nome não foi preenchido')
        if not data.get('passwd',None) or not data.get('conf_passwd',None) or data.get('passwd',None) != data.get('conf_passwd',None):
            errors.append('senha nao confere ou está em branco')
        if len(data.get('passwd','')) < 8:
            errors.append('senha deve conter no minimo 8 caracteres')
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
        hashpass = self.__generate_hash(data['email'])
        user.hashpass = hashpass
        self.__send_confirmation_email(data['email'], hashpass)
        user.image = 'user-img/default.jpg'
        #user.bairro = data['bairro']
        #user.escola = data['escola']
        #user.ano_letivo = data['ano_letivo']
        user.save()

        #log in the profile
        #profile = authenticate(username=user.email, password=data['passwd'])
        #login(request, profile)

        return Response({'created':True},200)

    def __validate_email(self, email):
        try:
            validate_email( email )
            return True
        except:
            return False

    def __generate_hash(self, email):
        return hashlib.sha224("%smelocotom%s" % (email, datetime.now())).hexdigest()

    def __send_confirmation_email(self, email, hashpass):
        link = "http://local.resumoportatil.com.br/lyra/confirmar-email/%(email)s/%(hashpass)s" % {'email': urllib.quote(email), 'hashpass':urllib.quote(hashpass)}
        with open(BASE_TEMPLATES+'/email.html','r') as f:
            data = f.read()
        mensagem = data.replace('||LINK||', link)
        send_mail(
            'Bem vindo ao Lyra! :D',
            '',
            'Resumo Portatil<noreplay@agenciaprimavera.com.br>',
            [email],
            html_message=mensagem,
            fail_silently=False,
        )
