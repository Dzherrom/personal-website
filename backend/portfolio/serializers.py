from rest_framework import serializers

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
        if not obj.cv_file:
            return ""
        request = self.context.get("request")
        url = obj.cv_file.url
        if request is not None:
            return request.build_absolute_uri(url)
        return url


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
            "order",
        ]

    def get_preview_image(self, obj: Client) -> str:
        if not obj.preview_image:
            return ""
        request = self.context.get("request")
        url = obj.preview_image.url
        if request is not None:
            return request.build_absolute_uri(url)
        return url


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
        if not obj.preview_image:
            return ""
        request = self.context.get("request")
        url = obj.preview_image.url
        if request is not None:
            return request.build_absolute_uri(url)
        return url


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "category", "icon_url", "order"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "subject", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
