from django.db import models


class SiteProfile(models.Model):
    """Datos personales del portfolio (hero, intro, footer)."""

    name = models.CharField(max_length=120)
    tagline = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=120, blank=True)
    email = models.EmailField(blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    cv_url = models.URLField(blank=True, help_text="Enlace al CV en PDF")
    whatsapp_number = models.CharField(
        max_length=20,
        blank=True,
        help_text="Número con código de país, sin + (ej. 521234567890)",
    )
    social_links = models.JSONField(
        default=list,
        blank=True,
        help_text='Links extra: [{"label": "GitHub", "url": "https://..."}]',
    )
    skills_note = models.CharField(
        max_length=255,
        blank=True,
        help_text='Nota bajo skills, ej. "*Actualmente aprendiendo Next.js"',
    )
    contact_title = models.CharField(
        max_length=120,
        default="¿Qué estás esperando?",
    )
    contact_message = models.TextField(
        blank=True,
        help_text="Texto de la sección de contacto al final del home",
    )
    intro_greeting = models.CharField(
        max_length=120,
        default="HOLA, SOY",
        help_text="Texto de la intro (ej. HOLA, SOY)",
    )
    intro_name = models.CharField(
        max_length=120,
        help_text="Nombre en la intro (ej. <TU-NOMBRE/>)",
    )
    typewriter_roles = models.JSONField(
        default=list,
        help_text='Lista de roles para Typed.js, ej. ["Desarrollador Frontend", "React"]',
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Perfil del sitio"
        verbose_name_plural = "Perfiles del sitio"

    def __str__(self) -> str:
        return self.name


class Client(models.Model):
    """Empresas o clientes con los que se ha trabajado."""

    name = models.CharField(max_length=120)
    logo_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Cliente / Experiencia"
        verbose_name_plural = "Clientes / Experiencias"

    def __str__(self) -> str:
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    highlights = models.JSONField(
        default=list,
        blank=True,
        help_text='Lista de logros: ["Feature 1", "Feature 2"]',
    )
    image_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    repo_url = models.URLField(blank=True)
    tech_stack = models.JSONField(default=list, help_text='["React", "Django"]')
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self) -> str:
        return self.title


class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, blank=True)
    icon_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self) -> str:
        return self.name


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} — {self.email}"
