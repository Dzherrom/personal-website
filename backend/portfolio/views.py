from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny

from .models import Client, ContactMessage, Project, SiteProfile, Skill
from .serializers import (
    ClientSerializer,
    ContactMessageSerializer,
    ProjectSerializer,
    SiteProfileSerializer,
    SkillSerializer,
)


class SiteProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteProfile.objects.filter(is_active=True)
    serializer_class = SiteProfileSerializer
    permission_classes = [AllowAny]


class ClientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.filter(is_featured=True)
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]


class ContactMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
