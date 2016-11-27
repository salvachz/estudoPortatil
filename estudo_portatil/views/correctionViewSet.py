from rest_framework.response import Response
from rest_framework import authentication, permissions, viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.utils import timezone
from estudo_portatil.models import UserProfile, Correction, Wording, CorrectionItem
from estudo_portatil.serializers import CorrectionSerializer, CorrectionItemSerializer

class CorrectionViewSet(viewsets.ModelViewSet):

    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.IsAuthenticated,)
    #permission_classes = ()

    queryset = Correction.objects.all()
    serializer_class = CorrectionSerializer

    def create(self, request, format = None):
        data = request.data
        print 'data:',data
        if data.get('wording_id',None):
            wording = Wording.objects.get(id=data['wording_id'][0])
            profile = UserProfile.objects.get(id=request.user.id)
            correction, created = Correction.objects.get_or_create(wording=wording, corrected_by=profile)
            correction.score = data.get('score',0)

        for item_id in xrange(1,10):
            item_in = data.get(str(item_id), None)
            if item_in:
                correctionItem = CorrectionItem.objects.create(correction=correction,number=item_id, item_text=item_in)
                correctionItem.save()
        correction.save()
        serializer = CorrectionSerializer(correction, many=False)
        return Response(serializer.data)

    def retrive(self, request, pk=None):
        profile = UserProfile.objects.get(id=request.user.id)
        wording = Wording.objects.get(id=pk)
        queryset = Correction.objects.filter(wording=wording, corrected_by=profile)
        serializer = CorrectionSerializer(queryset, many=True)
        if serializer.data:
            return Response(serializer.data[0])
        return Response([])
