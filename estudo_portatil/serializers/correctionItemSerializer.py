from rest_framework import serializers
from estudo_portatil.models import CorrectionItem


class CorrectionItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = CorrectionItem
        fields = ('number', 'item_text')
