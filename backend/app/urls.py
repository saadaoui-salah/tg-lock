from django.urls import path
from .views import AppListCreateView

urlpatterns = [
    path('apps/', AppListCreateView.as_view(), name='app-list-create'),
]