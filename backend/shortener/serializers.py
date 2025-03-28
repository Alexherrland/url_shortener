from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ShortURL

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff']
        read_only_fields = ['id']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_admin']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_admin=validated_data.get('is_admin', False)
        )
        return user

class ShortURLSerializer(serializers.ModelSerializer):
    clicks = serializers.SerializerMethodField()

    class Meta:
        model = ShortURL
        fields = ['id', 'original_url', 'short_code', 'created_at', 'clicks']
        read_only_fields = ['short_code', 'created_at']

    def get_clicks(self, obj):
        user = self.context.get('request').user
        return obj.clicks if user.is_staff or obj.user == user else None