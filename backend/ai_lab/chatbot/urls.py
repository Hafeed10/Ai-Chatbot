from django.urls import path
from .views import ai_view

urlpatterns = [
    path('ai/', ai_view, name='ai_view'),  # API endpoint to handle chatbot requests
]
