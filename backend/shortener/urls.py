from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShortURLViewSet, RedirectView, UserViewSet, CookieTrackerViewSet

router = DefaultRouter()
router.register(r'urls', ShortURLViewSet)
router.register(r'users', UserViewSet)
router.register(r'cookies', CookieTrackerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]