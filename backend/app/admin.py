from django.contrib import admin
from django.contrib.auth.models import User, Group
from admin_interface.models import Theme
from .models import Encomenda

admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.unregister(Theme)

@admin.register(Encomenda)
class EncomendaAdmin(admin.ModelAdmin):
    list_display = ( 'nome', 'produto', 'status')
    list_filter = ('status', 'data_entrega', 'data_recebimento')
    search_fields = ('nome', 'produto', 'telefone')
    readonly_fields = ('nome', 'telefone', 'produto', 'data_entrega', 'data_recebimento')

    #funções para controlar campos dinamicamente
    def get_readonly_fields(self, request, obj=None): 
        campos = ['nome', 'telefone', 'produto', 'data_recebimento']
        if obj and obj.status == 'entregue':
            campos.append('data_entrega')
        return campos

    def get_fields(self, request, obj=None): #define quais campos aparecem no formulario dinamicamente
        campos = ['nome', 'telefone', 'produto', 'status', 'data_recebimento']
        if obj and obj.status == 'entregue':
            campos.append('data_entrega')
        return campos