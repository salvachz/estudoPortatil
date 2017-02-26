from rest_framework import serializers
from estudo_portatil.models import Wording
from estudo_portatil.serializers import CategorySerializer, UserProfileSerializer


class WordingSerializer(serializers.ModelSerializer):

    category = CategorySerializer(read_only=True)
    written_by = UserProfileSerializer(read_only=True)

    avg_score = serializers.ReadOnlyField()
    score = serializers.ReadOnlyField()

    def __init__(self, *args, **kwargs):
        remove_fields = kwargs.pop('remove_fields', None)
        super(WordingSerializer, self).__init__(*args, **kwargs)

        if remove_fields:
            # for multiple fields in a list
            for field_name in remove_fields:
                self.fields.pop(field_name)

    class Meta:
        model = Wording
        fields = ('id', 'category', 'text', 'title', 'suport_text', 'written_by', 'avg_score', 'score')
        read_only_fields = ('id','category', 'user')
