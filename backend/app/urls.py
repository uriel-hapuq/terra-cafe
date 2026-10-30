from django.urls import path
from .views import ListCreateEncomendaViewSet, DeleteUpdateEncomendaViewSet

urlpatterns = [
    path('encomenda/', ListCreateEncomendaViewSet.as_view()),
    path('encomenda/<int:pk>/', DeleteUpdateEncomendaViewSet.as_view())
]
