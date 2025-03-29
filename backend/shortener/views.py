from django.shortcuts import redirect, get_object_or_404
from django.views import View
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import ShortURL, CookieTracker
from .serializers import ShortURLSerializer, UserSerializer, CookieTrackerSerializer
import uuid

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action in ['login', 'create', 'list']:
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=['post'], permission_classes=[AllowAny], authentication_classes=[])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user:
            # Create or get token for API authentication
            token, created = Token.objects.get_or_create(user=user)
            
            serializer = self.get_serializer(user)
            response_data = {
                'user': serializer.data,
                'is_staff': user.is_staff,
                'token': token.key  # Include token in response
            }
            
            response = Response(response_data)
            
            # If there's a cookie_id in the request, associate those URLs with the user
            cookie_id = request.COOKIES.get('url_shortener_id')
            if cookie_id:
                try:
                    cookie_tracker = CookieTracker.objects.get(cookie_id=cookie_id)
                    # Associate all URLs from this cookie with the authenticated user
                    ShortURL.objects.filter(cookie=cookie_tracker, user__isnull=True).update(user=user)
                except CookieTracker.DoesNotExist:
                    pass
                    
            return response
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class CookieTrackerViewSet(viewsets.ModelViewSet):
    queryset = CookieTracker.objects.all()
    serializer_class = CookieTrackerSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admins can directly access cookies

class ShortURLViewSet(viewsets.ModelViewSet):
    queryset = ShortURL.objects.all()
    serializer_class = ShortURLSerializer
    
    def get_permissions(self):
        if self.action == 'create' or self.action == 'list':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        
        # For authenticated users
        if user.is_authenticated:
            # Return all URLs for admin, only user's URLs for regular users
            return ShortURL.objects.all() if user.is_staff else ShortURL.objects.filter(user=user)
        
        # For anonymous users, return URLs associated with their cookie
        cookie_id = self.request.COOKIES.get('url_shortener_id')
        if cookie_id:
            try:
                cookie_tracker = CookieTracker.objects.get(cookie_id=cookie_id)
                return ShortURL.objects.filter(cookie=cookie_tracker)
            except CookieTracker.DoesNotExist:
                pass
                
        return ShortURL.objects.none()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Get the URL from the request
        original_url = serializer.validated_data.get('original_url')
        
        # Check if request has a user (authenticated) or use cookie
        if request.user.is_authenticated:
            # Create URL associated with the authenticated user
            short_url = ShortURL.objects.create(
                original_url=original_url,
                user=request.user
            )
        else:
            # Handle anonymous users with cookies
            cookie_id = request.COOKIES.get('url_shortener_id')
            if not cookie_id:
                cookie_id = str(uuid.uuid4())
                
            # Get or create cookie tracker
            cookie_tracker, created = CookieTracker.objects.get_or_create(cookie_id=cookie_id)
            
            # Create URL with cookie association
            short_url = ShortURL.objects.create(
                original_url=original_url,
                cookie=cookie_tracker
            )
            
        # Serialize and return the result
        result = ShortURLSerializer(short_url, context={'request': request})
        response = Response(result.data, status=status.HTTP_201_CREATED)
        
        # Set cookie if needed for anonymous users
        if not request.user.is_authenticated and (not request.COOKIES.get('url_shortener_id') or created):
            response.set_cookie('url_shortener_id', cookie_id, max_age=31536000)  # 1 year
            
        return response

    # Add method to retrieve URLs by cookie
    @action(detail=False, methods=['get'])
    def by_cookie(self, request):
        cookie_id = request.COOKIES.get('url_shortener_id')
        if not cookie_id:
            return Response([], status=status.HTTP_200_OK)
            
        try:
            cookie_tracker = CookieTracker.objects.get(cookie_id=cookie_id)
            urls = ShortURL.objects.filter(cookie=cookie_tracker)
            serializer = self.get_serializer(urls, many=True)
            return Response(serializer.data)
        except CookieTracker.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)

class RedirectView(View):
    authentication_classes = []
    permission_classes = [AllowAny]
    def get(self, request, short_code):
        short_url = get_object_or_404(ShortURL, short_code=short_code)
        short_url.clicks += 1
        short_url.save()
    
        return redirect(short_url.original_url)