from rest_framework.response import Response
from rest_framework import authentication, permissions, viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.utils import timezone
from estudo_portatil.models import UserProfile, Correction, Wording, CorrectionItem
from estudo_portatil.serializers import CorrectionSerializer, CorrectionItemSerializer

class CorrectionItemViewSet(viewsets.ModelViewSet):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.IsAuthenticated,)
    #permission_classes = ()

    queryset = CorrectionItem.objects.all()
    serializer_class = CorrectionItemSerializer

    def retrive_items(self, request, pk=None):
        queryset = CorrectionItem.objects.filter(correction=pk,correction__corrected_by__id=request.user.id)
        print queryset.query
        serializer = CorrectionItemSerializer(queryset, many=False)
        return Response(serializer.data)
