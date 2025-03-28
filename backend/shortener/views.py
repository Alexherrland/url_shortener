from django.shortcuts import redirect, get_object_or_404
from django.views import View
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import ShortURL
from .serializers import ShortURLSerializer, UserSerializer
import uuid

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user:
            serializer = self.get_serializer(user)
            return Response({
                'user': serializer.data,
                'is_admin': user.is_staff
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class ShortURLViewSet(viewsets.ModelViewSet):
    queryset = ShortURL.objects.all()
    serializer_class = ShortURLSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            user = self.request.user
            return ShortURL.objects.filter(user=user) if not user.is_staff else ShortURL.objects.all()
        
        cookie_id = self.request.COOKIES.get('url_shortener_id')
        return ShortURL.objects.filter(cookie_id=cookie_id) if cookie_id else ShortURL.objects.none()

    def perform_create(self, serializer):
        request = self.request
        
        if request.user.is_authenticated:
            serializer.save(user=request.user)
        else:
            cookie_id = request.COOKIES.get('url_shortener_id') or str(uuid.uuid4())
            serializer.save(cookie_id=cookie_id)

class RedirectView(View):
    def get(self, request, short_code):
        short_url = get_object_or_404(ShortURL, short_code=short_code)
        short_url.clicks += 1
        short_url.save()
    
        return redirect(short_url.original_url)
