from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        username = os.environ.get('ADMIN_USERNAME', 'marta123')
        password = os.environ.get('ADMIN_PASSWORD', 'terracafe')

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username=username,
                password=password,
            )
            self.stdout.write('Superuser criado!')
        else:
            self.stdout.write('Superuser já existe.')