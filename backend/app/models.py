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


