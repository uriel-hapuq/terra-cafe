# TerraCafe 🍰☕

Sistema de gerenciamento de encomendas para o Café do Bairro da Dona Marta. Permite que clientes façam encomendas pelo site e que a proprietária gerencie os pedidos pelo painel administrativo.

## LINKS DE PRODUÇÃO

  - **Frontend:** https://terra-cafe-kappa.vercel.app/
  - **Backend:** https://terracafe-backend.onrender.com/
  - **Página de Admin:** https://terracafe-backend.onrender.com/admin/

## DEPENDÊNCIAS DO PROJETO

### BACKEND (Django)
    Django, djangorestframework, djangorestframework_simplejwt, django-admin-interface,
    django-colorfield, django-cors-headers, gunicorn, python-dotenv,
    psycopg2-binary, dj-database-url, whitenoise

### BACKEND (Django)
    @hookform/resolvers, leaflet, react, react-dom, react-hook-form, 
    react-icons, react-leaflet, react-toastify, zod, typescript, vite

## COMANDOS PARA INSTALAR AS DEPENDÊNCIAS E RODAR SERVIDOR LOCALMENTE

### Backend (executar na pasta `backend`)
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py create_superuser
    python manage.py runserver

### Frontend (executar na pasta `frontend/terracafe`)
    npm install --legacy-peer-deps
    npm run dev

## INSTRUÇÕES PARA PREENCHER O ARQUIVO .ENV PARA RODAR LOCALMENTE

### Backend (pasta `backend`)
Não precisa criar um `.env` no backend para rodar o projeto. Quando você executa `python manage.py create_superuser`, um superusuário padrão já é criado automaticamente com as mesmas credenciais da aplicação em produção no Render:

    - Usuário: `marta123`
    - Senha: `terracafe`
Se quiser personalizar, crie um arquivo `.env` na pasta `backend` com:

    SECRET_KEY=sua-chave-secreta
    DEBUG=True
    ADMIN_USERNAME=usuario123
    ADMIN_PASSWORD=usuario123

### Frontend (pasta `frontend/terracafe`)

Copie o arquivo `.env.example` e renomeie para `.env`:

```bash
cp .env.example .env
```

O arquivo já vem com o valor padrão para rodar localmente:

```
VITE_API_URL=http://127.0.0.1:8000
```

## ROTAS DO FRONTEND 
  - Landing page (cardápio, localização, formulário de encomenda)


## ROTAS DO BACKEND

### CRIAR ENCOMENDA

> POST /api/encomenda/

ENTRADA:

```json
{
    "nome": "Seu Fulano",
    "telefone": "73999999999",
    "produto": "Bolo de chocolate com recheio de passas e cobertura de ninho"
}
```

SAÍDA:

```json
{
    "id": 1,
    "nome": "Seu Fulano",
    "telefone": "73999999999",
    "produto": "Bolo de chocolate com recheio de passas e cobertura de ninho",
    "data_entrega": "2026-11-05",
    "data_recebimento": "2026-11-05",
    "status": "recebida"
}
```
### BUSCAR ENCOMENDA POR ID

> GET /api/encomenda/{id}/

SAÍDA:

```json
{
    "id": 1,
    "nome": "Beltrano Santos",
    "telefone": "73999999999",
    "produto": "Bolo de chocolate com recheio de chocolate e cobertura de morango",
    "data_entrega": "2026-11-05",
    "data_recebimento": "2026-11-05",
    "status": "recebida"
}
```

### LISTAR TODAS ENCOMENDAS

> GET /api/encomenda/

SAÍDA:

```json
[
    {
        "id": 1,
        "nome": "Sicrano Souza Silva",
        "telefone": "73999999999",
        "produto": "Bolo de chocolate com recheio de ninho e cobertura glacê",
        "data_entrega": "2026-11-05",
        "data_recebimento": "2026-11-05",
        "status": "recebida"
    }
]
```

### ATUALIZAR ENCOMENDA

> PATCH /api/encomenda/{id}/

ENTRADA:

```json
{
    "status": "em_preparo"
}
```

SAÍDA: 

```json
[
    {
        "id": 1,
        "nome": "Sr. John Doe",
        "telefone": "73999999999",
        "produto": "Bolo de cenoura com recheio de maracujá e cobertura de kiwi",
        "data_entrega": "2026-11-05",
        "data_recebimento": "2026-11-05",
        "status": "em_preparo"
    }
]
```

### DELETAR ENCOMENDA

> DELETE /api/encomenda/{id}/

SAÍDA:

STATUS: 204


## REGRAS DE NEGÓCIO

- Limite de **5 encomendas por dia**. se o limite for atingido a encomenda será jogado para o dia seguinte
- Campos extras não permitidos são rejeitados com aviso
- Somente o admin pode atualizar o status das encomendas
- A data de entrega é preenchida automaticamente quando o status muda para `entregue`
