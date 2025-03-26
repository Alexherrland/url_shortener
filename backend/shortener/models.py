from django.db import models
from django.core.validators import URLValidator
import string
import random

class ShortURL(models.Model):
    original_url = models.URLField(validators=[URLValidator()])
    short_code = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    clicks = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.short_code:
            self.short_code = self.generate_unique_short_code()
        super().save(*args, **kwargs)

    def generate_unique_short_code(self, length=6):
        """Generate a unique short code"""
        chars = string.ascii_letters + string.digits
        while True:
            code = ''.join(random.choice(chars) for _ in range(length))
            if not ShortURL.objects.filter(short_code=code).exists():
                return code

    def __str__(self):
        return f"{self.original_url} -> {self.short_code}"