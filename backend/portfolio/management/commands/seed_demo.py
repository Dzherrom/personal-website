from django.core.files import File
from django.core.management.base import BaseCommand
from pathlib import Path

from portfolio.models import Client, Project, SiteProfile, Skill

SEED_ASSETS = Path(__file__).resolve().parent.parent.parent / "seed_assets"


class Command(BaseCommand):
    help = "Carga datos de demostración para el portfolio"

    def handle(self, *args, **options):
        profile, created = SiteProfile.objects.update_or_create(
            name="Tu Nombre",
            defaults={
                "tagline": "Un desarrollador que ama crear soluciones para la web.",
                "bio": (
                    "Ingeniero en informática especializado en la construcción "
                    "(y ocasionalmente diseño) de experiencias digitales excepcionales. "
                    "Actualmente vivo en México. Estoy en el área de frontend desde 2020."
                ),
                "location": "México",
                "email": "tu@email.com",
                "github_url": "https://github.com",
                "linkedin_url": "https://linkedin.com",
                "whatsapp_number": "521234567890",
                "social_links": [
                    {"label": "GitHub", "url": "https://github.com"},
                    {"label": "LinkedIn", "url": "https://linkedin.com"},
                ],
                "skills_note": "*Actualmente estoy aprendiendo Next.js.",
                "contact_title": "¿Qué estás esperando?",
                "contact_message": (
                    "Estoy buscando nuevas experiencias en el negocio. "
                    "Mi bandeja de entrada siempre está abierta: haz clic en WhatsApp "
                    "o envíame un correo, te responderé lo antes posible."
                ),
                "intro_greeting": "HOLA, SOY",
                "intro_name": "<TU-NOMBRE/>",
                "typewriter_roles": [
                    "Desarrollador Frontend React",
                    "Desarrollador Full Stack",
                    "Apasionado por Django",
                ],
                "is_active": True,
            },
        )
        self.stdout.write(
            self.style.SUCCESS(
                f"Perfil {'creado' if created else 'actualizado'}: {profile.name}"
            )
        )

        Client.objects.filter(
            name__in=["Empresa Alpha", "Startup Beta", "Agencia Gamma"]
        ).delete()

        client, created = Client.objects.update_or_create(
            name="TaskUp",
            defaults={
                "description": (
                    "Landing page para TaskUp, plataforma de asistentes virtuales. "
                    "Diseño moderno con hero, navegación y CTAs orientados a conversión."
                ),
                "highlights": [
                    "Hero con mensaje principal y llamadas a la acción",
                    "Navegación responsive con secciones de pricing y contacto",
                    "Diseño visual alineado con la identidad de la marca",
                ],
                "tech_stack": ["React", "TypeScript", "CSS"],
                "website_url": "https://www.hiretaskup.com",
                "logo_url": "",
                "order": 1,
            },
        )

        preview_path = SEED_ASSETS / "taskup-preview.png"
        if preview_path.exists():
            with preview_path.open("rb") as preview_file:
                client.preview_image.save(
                    "taskup-preview.png",
                    File(preview_file),
                    save=True,
                )
        action = "creado" if created else "actualizado"
        self.stdout.write(self.style.SUCCESS(f"Cliente {action}: {client.name}"))

        projects_data = [
            {
                "title": "Portfolio Personal",
                "slug": "portfolio-personal",
                "description": (
                    "Mi portafolio usando React y Django REST para manejar el contenido dinámico."
                ),
                "highlights": [
                    "Diseño y construcción con animaciones Framer Motion",
                    "API REST con Django para proyectos, skills y contacto",
                    "Scroll reveal en cada sección del home",
                ],
                "tech_stack": ["React", "TypeScript", "Django", "Framer Motion"],
                "demo_url": "",
                "repo_url": "https://github.com",
                "order": 1,
            },
            {
                "title": "App de Tareas",
                "slug": "app-tareas",
                "description": "Aplicación CRUD con autenticación y panel de administración.",
                "highlights": [
                    "CRUD completo de tareas",
                    "Autenticación de usuarios",
                    "Panel de administración",
                ],
                "tech_stack": ["React", "Django REST", "PostgreSQL"],
                "demo_url": "",
                "repo_url": "https://github.com",
                "order": 2,
            },
        ]

        for data in projects_data:
            project, created = Project.objects.update_or_create(
                slug=data["slug"],
                defaults={**data, "is_featured": True},
            )
            action = "creado" if created else "actualizado"
            self.stdout.write(self.style.SUCCESS(f"Proyecto {action}: {project.title}"))

        skills_data = [
            ("React", "Frontend", 1),
            ("TypeScript", "Frontend", 2),
            ("Django", "Backend", 3),
            ("Python", "Backend", 4),
            ("PostgreSQL", "Database", 5),
            ("Framer Motion", "Animación", 6),
            ("SASS", "Estilos", 7),
        ]

        for name, category, order in skills_data:
            skill, created = Skill.objects.update_or_create(
                name=name,
                defaults={"category": category, "order": order},
            )
            action = "creado" if created else "actualizado"
            self.stdout.write(self.style.SUCCESS(f"Skill {action}: {skill.name}"))

        self.stdout.write(self.style.SUCCESS("Datos de demostración cargados correctamente."))
