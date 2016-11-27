from rest_framework import serializers
from estudo_portatil.models import Correction
from estudo_portatil.serializers import WordingSerializer, CorrectionItemSerializer


class CorrectionSerializer(serializers.ModelSerializer):

    wording = WordingSerializer(read_only=True)
    correctionitem_set = CorrectionItemSerializer(read_only=True, many=True)
    
    class Meta:
        model = Correction
        fields = ('id', 'wording', 'corrected_at', 'score', 'correctionitem_set')
