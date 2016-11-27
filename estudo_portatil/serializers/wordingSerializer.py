from rest_framework import serializers
from estudo_portatil.models import Wording
from estudo_portatil.serializers import CategorySerializer


class WordingSerializer(serializers.ModelSerializer):

    category = CategorySerializer(read_only=True)
    class Meta:
        model = Wording
        fields = ('id', 'category', 'text', 'title', 'suport_text')
        read_only_fields = ('id','category')
