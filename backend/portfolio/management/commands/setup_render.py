import os

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Carga datos demo y crea/actualiza el usuario admin (despliegue Render)"

    def handle(self, *args, **options):
        call_command("seed_demo")

        username = os.getenv("DJANGO_ADMIN_USERNAME", "admin")
        email = os.getenv("DJANGO_ADMIN_EMAIL", "admin@example.com")
        password = os.getenv("DJANGO_ADMIN_PASSWORD")

        if not password:
            self.stderr.write(
                self.style.WARNING(
                    "DJANGO_ADMIN_PASSWORD no está definida; se omitió crear el admin."
                )
            )
            return

        user_model = get_user_model()
        user, created = user_model.objects.update_or_create(
            username=username,
            defaults={
                "email": email,
                "is_staff": True,
                "is_superuser": True,
            },
        )
        user.set_password(password)
        user.save()

        action = "creado" if created else "actualizado"
        self.stdout.write(
            self.style.SUCCESS(f"Usuario admin {action}: {username} ({email})")
        )
