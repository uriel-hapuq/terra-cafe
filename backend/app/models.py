from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError as DjangoValidationError

class Encomenda(models.Model):
    STATUS_CHOICES = [
        ('recebida', 'Recebida'),
        ('em_preparo', 'Em preparo'),
        ('pronto_para_retirada', 'Pronto para retirada'),
        ('entregue', 'Entregue')
    ]

    id = models.BigAutoField(primary_key=True)
    nome = models.CharField(max_length=20)
    telefone = models.CharField(
        max_length=15,
        validators=[
            RegexValidator(
            regex=r'^\+?1?\d{9,15}$',
            message="O número de telefone deve conter entre 9 e 15 dígitos." #regex para numero br
        )
    ])
    produto = models.CharField(max_length=50)
    data_recebimento = models.DateField(auto_now_add=True)
    data_entrega = models.DateField(default=timezone.localdate)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='recebida'
    )

    def __str__(self):
        return f"Encomenda de {self.nome} ({self.produto})"

    # impede que sejha feita mais de 5 encomendas por dia (fica aqui pra cobrir a parte do django admin)
    # def clean(self):

    #     #logica que impoe a regra de limite de 5 encomendas por dia na pagina de admin do django 
    #     encomendas_no_dia = Encomenda.objects.filter(data_entrega=self.data_entrega)
        
    #     if self.pk:
    #         encomendas_no_dia = encomendas_no_dia.exclude(pk=self.pk)
        
    #     if encomendas_no_dia.count() >= 5:
    #         raise DjangoValidationError(
    #             f"Limite de 5 encomendas para {self.data_entrega} atingido."
    #         )

    # def save(self, *args, **kwargs):
    #     # Se o objeto já existe no banco, vamos verificar se o status mudou
    #     if self.pk:
    #         original = Encomenda.objects.get(pk=self.pk)
    #         print(original)
    #         # Verifica se o status mudou para 'Pronto para retirada' agora
    #         if original.status != 'Pronto para retirada' and self.status == 'Pronto para retirada':
    #             self.enviar_whatsapp_pronto()
                
    #     super().save(*args, **kwargs)
