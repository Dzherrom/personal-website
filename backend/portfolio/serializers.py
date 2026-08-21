from rest_framework import serializers

from .media_utils import resolve_file_url, resolve_preview_image
from .models import Client, ContactMessage, Project, SiteProfile, Skill


class SiteProfileSerializer(serializers.ModelSerializer):
    cv_file = serializers.SerializerMethodField()

    class Meta:
        model = SiteProfile
        fields = [
            "id",
            "name",
            "tagline",
            "bio",
            "location",
            "email",
            "github_url",
            "linkedin_url",
            "cv_file",
            "whatsapp_number",
            "social_links",
            "skills_note",
            "contact_title",
            "contact_message",
            "intro_greeting",
            "intro_name",
            "typewriter_roles",
        ]

    def get_cv_file(self, obj: SiteProfile) -> str:
        return resolve_file_url(
            obj.cv_file,
            obj.cv_file_url,
            self.context.get("request"),
        )


class ClientSerializer(serializers.ModelSerializer):
    preview_image = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = [
            "id",
            "name",
            "description",
            "highlights",
            "tech_stack",
            "logo_url",
            "preview_image",
            "website_url",
            "repo_url",
            "order",
        ]

    def get_preview_image(self, obj: Client) -> str:
        return resolve_preview_image(
            obj.preview_image,
            obj.preview_image_url,
            self.context.get("request"),
        )


class ProjectSerializer(serializers.ModelSerializer):
    preview_image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "highlights",
            "preview_image",
            "demo_url",
            "repo_url",
            "tech_stack",
            "order",
            "is_featured",
            "created_at",
        ]

    def get_preview_image(self, obj: Project) -> str:
        return resolve_preview_image(
            obj.preview_image,
            obj.preview_image_url,
            self.context.get("request"),
        )


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "category", "icon_url", "order"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "subject", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
