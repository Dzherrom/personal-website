from rest_framework import serializers

from .models import Client, ContactMessage, Project, SiteProfile, Skill


class SiteProfileSerializer(serializers.ModelSerializer):
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
            "cv_url",
            "whatsapp_number",
            "social_links",
            "skills_note",
            "contact_title",
            "contact_message",
            "intro_greeting",
            "intro_name",
            "typewriter_roles",
        ]


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "name", "logo_url", "website_url", "order"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "highlights",
            "image_url",
            "demo_url",
            "repo_url",
            "tech_stack",
            "order",
            "is_featured",
            "created_at",
        ]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "category", "icon_url", "order"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "subject", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
