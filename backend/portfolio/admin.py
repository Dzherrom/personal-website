from django.contrib import admin

from .models import Client, ContactMessage, Project, SiteProfile, Skill


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "is_active")
    list_filter = ("is_active",)


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ("name", "order", "website_url")
    list_editable = ("order",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "order", "is_featured", "created_at")
    list_filter = ("is_featured",)
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "order")
    list_filter = ("category",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "created_at")
    list_filter = ("is_read",)
    readonly_fields = ("created_at",)
