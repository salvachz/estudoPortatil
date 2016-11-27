from rest_framework.response import Response
from rest_framework import authentication, permissions, viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.utils import timezone
from estudo_portatil.models import UserProfile, Wording
from estudo_portatil.serializers import WordingSerializer

class WordingViewSet(viewsets.ModelViewSet):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.IsAuthenticated,)
    #permission_classes = ()

    queryset = Wording.objects.all()
    serializer_class = WordingSerializer

    def list(self, request, format=None):
        queryset = Wording.objects.all()
        serializer = WordingSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrive(self, request, pk=None):
        if not pk:
            return Response({'errors':['empty PK']}, status=404)
        queryset = Wording.objects.filter(id=pk)
        serializer = WordingSerializer(queryset, many=True)
        return Response(serializer.data[0])

    def create(self, request, format=None):
        
        wording = Wording.objects.create(title=request.data.get('title',''), text=request.data.get('text',''), category_id=request.data.get('category',''), written_by_id=request.user.id)
        wording.save()
        print 'wording',wording
        serializer = WordingSerializer(wording, many=False)
        return Response(serializer.data)
