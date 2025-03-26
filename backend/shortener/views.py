from django.shortcuts import redirect, get_object_or_404
from django.views import View
from rest_framework import viewsets
from .models import ShortURL
from .serializers import ShortURLSerializer

class ShortURLViewSet(viewsets.ModelViewSet):
    queryset = ShortURL.objects.all()
    serializer_class = ShortURLSerializer

class RedirectView(View):
    def get(self, request, short_code):
        short_url = get_object_or_404(ShortURL, short_code=short_code)
        short_url.clicks += 1
        short_url.save()
        return redirect(short_url.original_url)