from rest_framework.response import Response
from rest_framework import authentication, permissions, viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.utils import timezone
from django.core.mail import send_mail
from estudo_portatil.models import UserProfile, Wording
from estudo_portatil.serializers import WordingSerializer

class FeedbackViewSet(viewsets.ModelViewSet):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.IsAuthenticated,)
    #permission_classes = ()

    queryset = Wording.objects.all()
    serializer_class = WordingSerializer

    def send(self, request, format=None):
        data = {}
        errors = []
        data['assunto'] = request.data.get('assunto','')
        data['mensagem'] = request.data.get('mensagem','')
        print data
        for k in data:
            if not data[k]:
                errors.append('%s em branco' % k)
        if errors:
            return Response({'errors':errors}, status=404)

        send_mail(
            '[feedback lyra] %s' % data['assunto'],
            data['mensagem'],
            request.user.email,
            ['contato@agenciaprimavera.com.br'],
            fail_silently=False,
        )
        return Response({'status':'SUCCESS'}, status=200)
