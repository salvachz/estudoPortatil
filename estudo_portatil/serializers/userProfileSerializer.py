from rest_framework import serializers
from estudo_portatil.models import UserProfile
from estudo_portatil.serializers import Base64ImageField


class UserProfileSerializer(serializers.ModelSerializer):
    image = Base64ImageField(
        max_length=None, use_url=True,
    )

    class Meta:
        model = UserProfile
        fields = ('id', 'name', 'image')
