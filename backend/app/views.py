from .models import Encomenda
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import EncomendaSerializer
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.http import Http404
from rest_framework import status

class ListCreateEncomendaViewSet(ListCreateAPIView):
    queryset = Encomenda.objects.all()
    serializer_class = EncomendaSerializer
    #impede campos nao permitidos no POST e GET
    def post(self, request, *args, **kwargs):
        campos_validos = {'nome', 'telefone', 'produto'}
        campos_extras = set(request.data.keys()) - campos_validos
        if campos_extras:
            return Response(
                {campo: "Campo não permitido." for campo in campos_extras},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().post(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        if request.body:
            return Response(
                {"erro": "Requisições do tipo GET não devem enviar um corpo JSON."},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().get(request, *args, **kwargs) 

class DeleteUpdateEncomendaViewSet(RetrieveUpdateDestroyAPIView):
    queryset = Encomenda.objects.all()
    serializer_class = EncomendaSerializer
    lookup_url_kwarg = "pk"
    
    def get_object(self):
        try:
            return super().get_object()
        except Http404:
            raise NotFound({"erro": "ID não encontrado."})
        
    def http_method_not_allowed(self, request, *args, **kwargs):
        return Response(
            {
                "erro": "post nao permitido",
                "dica": "Para criar uma nova encomenda, envie o POST sem o ID na URL (ex: /api/encomenda/). Para atualizar esta encomenda, utilize PUT ou PATCH."
            },
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )  
    
     #impede campos json no get
    def get(self, request, *args, **kwargs):
        if request.body:
            return Response(
                {"erro": "Requisições do tipo GET não devem enviar um corpo JSON."},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().get(request, *args, **kwargs)  
    
    #impede campos no DELETE
    def delete(self, request, *args, **kwargs):
        if request.body:
            return Response(
                {"erro": "Requisições do tipo DELETE não devem enviar um corpo JSON."},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().delete(request, *args, **kwargs)
    
    #impede campos nao permitidos no PATCH
    def patch(self, request, *args, **kwargs):
        campos_validos = {'status'}
        campos_extras = set(request.data.keys()) - campos_validos
        if campos_extras:
            return Response(
                {campo: "Campo não permitido." for campo in campos_extras},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().patch(request, *args, **kwargs)