from .models import Encomenda
from rest_framework.serializers import ModelSerializer, ValidationError, DateField
from django.utils import timezone
from datetime import timedelta

class EncomendaSerializer(ModelSerializer):
    data_entrega = DateField(default=timezone.localdate)
    class Meta:
        fields = '__all__'
        model = Encomenda
        read_only_fields = ['data_recebimento'] #deve ser definido somente na atualização

    #necessario para limitar as 5 encomendas (fica aqui pra cobrir o server side (sem o django admin))
    def validate(self, data):
        if 'data_entrega' not in data or data.get('data_entrega') is None:
            if self.instance:
                data['data_entrega'] = self.instance.data_entrega
            else:
                data['data_entrega'] = timezone.localdate()

        data_entrega = data.get('data_entrega')

        while True:
            encomendas_no_dia = Encomenda.objects.filter(data_entrega=data_entrega)
            if self.instance:
                encomendas_no_dia = encomendas_no_dia.exclude(pk=self.instance.pk)

            if encomendas_no_dia.count() < 5:
                break

            data_entrega += timedelta(days=1)

        data['data_entrega'] = data_entrega
        return data