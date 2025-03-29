from django.contrib import admin
from .models import ShortURL, CookieTracker

@admin.register(ShortURL)
class ShortURLAdmin(admin.ModelAdmin):
    list_display = ('original_url', 'short_code', 'created_at', 'clicks', 'user', 'cookie')
    search_fields = ('original_url', 'short_code', 'user__username')
    readonly_fields = ('created_at', 'clicks')
    list_filter = ('user', 'cookie')

@admin.register(CookieTracker)
class CookieTrackerAdmin(admin.ModelAdmin):
    list_display = ('cookie_id', 'created_at', 'last_used', 'url_count')
    search_fields = ('cookie_id',)
    readonly_fields = ('created_at', 'last_used')
    
    def url_count(self, obj):
        return obj.short_urls.count()
    url_count.short_description = 'Number of URLs'