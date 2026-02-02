from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("", TemplateView.as_view(template_name="vault/index.html"), name="index"),
    path("api/health/", views.health, name="health"),
    path("api/analyze/", views.analyze_image, name="analyze_image"),
]
