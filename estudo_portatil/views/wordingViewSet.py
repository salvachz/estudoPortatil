from rest_framework.response import Response
from rest_framework import authentication, permissions, viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.utils import timezone
from django.db.models import Avg
from estudo_portatil.models import UserProfile, Wording, Correction
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

    def list_written(self, request, format=None):
        queryset = Wording.objects.filter(written_by_id=request.user.id).annotate(avg_score=Avg('correction__score'))
        serializer = WordingSerializer(queryset, many=True, remove_fields=['text','suport_text','written_by'])
        return Response(serializer.data)

    def list_correction(self, request, format=None):
        c = Correction.objects.filter(corrected_by_id=request.user.id).values('wording_id', 'score')
        #TODO: REDO this def =D
        correction_scores = {}
        for row in c:
            correction_scores[row['wording_id']] = row['score']
        queryset = Wording.objects.filter(id__in=correction_scores.keys())
        for row in queryset:
            row.score = correction_scores[row.id]
        serializer = WordingSerializer(queryset, many=True, remove_fields=['text','suport_text'])
        return Response(serializer.data)

    def retrive(self, request, pk=None):
        if not pk:
            return Response({'errors':['empty PK']}, status=404)
        queryset = Wording.objects.filter(id=pk)
        serializer = WordingSerializer(queryset, many=True)
        return Response(serializer.data[0])

    def create(self, request, format=None):
        data = {}
        errors = []
        data['title'] = request.data.get('title','')
        data['text'] = request.data.get('text','')
        data['category_id'] = request.data.get('category','')
        for k in data:
            if not data[k]:
                errors.append('%s em branco' % k)
        if errors:
            return Response({'errors':errors}, status=404)
        if not data['category_id'].isdigit():
                errors.append('Categoria invalida')
        
        wording = Wording.objects.create(
            title=data['title'],
            text=data['text'],
            category_id=data['category_id'],
            written_by_id=request.user.id
        )
        wording.save()
        serializer = WordingSerializer(wording, many=False)
        return Response(serializer.data)
