from django.contrib import admin

from .models import Client, ContactMessage, Project, SiteProfile, Skill


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "is_active", "has_cv")
    list_filter = ("is_active",)
    fieldsets = (
        (
            "Identidad",
            {
                "fields": (
                    "name",
                    "tagline",
                    "bio",
                    "location",
                    "email",
                    "cv_file",
                    "cv_file_url",
                    "is_active",
                ),
            },
        ),
        (
            "Intro",
            {
                "fields": ("intro_greeting", "intro_name", "typewriter_roles"),
            },
        ),
        (
            "Enlaces",
            {
                "fields": ("github_url", "linkedin_url", "whatsapp_number", "social_links"),
            },
        ),
        (
            "Contacto",
            {
                "fields": ("contact_title", "contact_message", "skills_note"),
            },
        ),
    )

    @admin.display(boolean=True, description="CV")
    def has_cv(self, obj: SiteProfile) -> bool:
        return bool(obj.cv_file)


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ("name", "order", "website_url")
    list_editable = ("order",)
    fieldsets = (
        (
            "Proyecto para cliente",
            {
                "fields": (
                    "name",
                    "description",
                    "highlights",
                    "tech_stack",
                    "preview_image",
                    "preview_image_url",
                    "order",
                ),
            },
        ),
        (
            "Enlaces",
            {
                "fields": ("website_url", "repo_url", "logo_url"),
            },
        ),
    )


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "order", "is_featured", "created_at")
    list_filter = ("is_featured",)
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at",)
    fieldsets = (
        (
            "Proyecto",
            {
                "fields": ("title", "slug", "description", "highlights", "preview_image", "preview_image_url", "order", "is_featured", "created_at"),
            },
        ),
        (
            "Enlaces",
            {
                "fields": ("demo_url", "repo_url", "tech_stack"),
            },
        ),
    )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "order")
    list_filter = ("category",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "created_at")
    list_filter = ("is_read",)
    readonly_fields = ("created_at",)
