from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ClientViewSet,
    ContactMessageViewSet,
    ProjectViewSet,
    SiteProfileViewSet,
    SkillViewSet,
)

router = DefaultRouter()
router.register("profile", SiteProfileViewSet, basename="profile")
router.register("clients", ClientViewSet, basename="client")
router.register("projects", ProjectViewSet, basename="project")
router.register("skills", SkillViewSet, basename="skill")
router.register("contact", ContactMessageViewSet, basename="contact")

urlpatterns = [
    path("", include(router.urls)),
]
