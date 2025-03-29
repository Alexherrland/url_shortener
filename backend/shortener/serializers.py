from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ShortURL, CookieTracker

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff']
        read_only_fields = ['id']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    is_admin = serializers.BooleanField(required=False, default=False)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_admin']
    
    def create(self, validated_data):
        is_admin = validated_data.pop('is_admin', False)
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_staff=is_admin
        )
        return user

class CookieTrackerSerializer(serializers.ModelSerializer):
    url_count = serializers.SerializerMethodField()
    
    class Meta:
        model = CookieTracker
        fields = ['id', 'cookie_id', 'created_at', 'last_used', 'url_count']
        read_only_fields = ['cookie_id', 'created_at', 'last_used']
    
    def get_url_count(self, obj):
        return obj.short_urls.count()

class ShortURLSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True, allow_null=True)
    username = serializers.CharField(source='user.username', read_only=True, allow_null=True)
    cookie_id = serializers.CharField(source='cookie.cookie_id', read_only=True, allow_null=True)
    
    class Meta:
        model = ShortURL
        fields = ['id', 'original_url', 'short_code', 'created_at', 'clicks', 
                  'user_id', 'username', 'cookie_id']
        read_only_fields = ['id', 'short_code', 'created_at', 'clicks', 'user_id', 
                           'username', 'cookie_id']