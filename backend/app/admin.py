from django.contrib import admin
from django.contrib.auth.models import User, Group
from admin_interface.models import Theme
from .models import Encomenda

admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.unregister(Theme)

@admin.register(Encomenda)
class EncomendaAdmin(admin.ModelAdmin):
    list_display = ( 'nome', 'produto', 'status', 'data_entrega', 'data_recebimento')
    list_filter = ('status', 'data_entrega', 'data_recebimento')
    search_fields = ('nome', 'produto', 'telefone')
    readonly_fields = ('data_entrega', 'data_recebimento')

