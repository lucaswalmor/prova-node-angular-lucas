# TechX — Gerenciador de Tarefas

Aplicação full stack de to-do list desenvolvida como desafio técnico: listagem, criação, edição, exclusão e marcação de tarefas como concluídas, com autenticação JWT (desafio extra).

## Stack

| Camada | Tecnologias |
|---|---|
| Frontend | Angular 21, Tailwind CSS, RxJS |
| Backend | Node.js, TypeScript, Express, JWT |
| Banco | MySQL + Prisma ORM |

## Estrutura do projeto

```
desafio-essentia-tecnologies/
├── backend/     # API REST (porta 3000)
├── frontend/    # Interface Angular (porta 4200)
└── README.md
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- [MySQL](https://www.mysql.com/) rodando localmente
- npm

## Configuração do banco de dados

1. Crie o banco no MySQL:

```sql
CREATE DATABASE todo;
```

2. A conexão de runtime do backend está em `backend/src/database/prisma.ts`:

| Parâmetro | Valor padrão |
|---|---|
| Host | `127.0.0.1` |
| Porta | `3306` |
| Usuário | `root` |
| Senha | *(vazia)* |
| Database | `todo` |

Ajuste esses valores se o seu MySQL usar outras credenciais.

3. Crie o arquivo `backend/.env` (pode basear-se em `backend/.env.example`):

```env
DATABASE_URL="mysql://root@127.0.0.1:3306/todo"
JWT_SECRET="uma-chave-secreta-qualquer"
```

Se o MySQL tiver senha:

```env
DATABASE_URL="mysql://root:SUA_SENHA@127.0.0.1:3306/todo"
JWT_SECRET="uma-chave-secreta-qualquer"
```

> O `JWT_SECRET` é obrigatório para gerar e validar os tokens de autenticação.

## Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

A API sobe em: **http://localhost:3000**

### Autenticação (JWT)

As rotas de `/tasks` são **protegidas**. É necessário criar um usuário, fazer login e enviar o token no header.

#### 1. Criar usuário

`POST /auth/register`

```json
{
  "email": "seu@email.com",
  "password": "123456"
}
```

#### 2. Login

`POST /auth/login`

```json
{
  "email": "seu@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Usar o token nas rotas de tasks

Em todas as requisições a `/tasks`, envie o header:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

Sem token (ou com token inválido), a API responde **401**.

### Endpoints

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `POST` | `/auth/register` | Não | Cria usuário |
| `POST` | `/auth/login` | Não | Retorna JWT |
| `GET` | `/tasks` | Sim | Lista todas as tarefas |
| `GET` | `/tasks/:id` | Sim | Busca uma tarefa |
| `POST` | `/tasks` | Sim | Cria uma tarefa |
| `PUT` | `/tasks/:id` | Sim | Atualiza uma tarefa |
| `DELETE` | `/tasks/:id` | Sim | Remove uma tarefa |

#### Exemplo de body (`POST` / `PUT` em `/tasks`)

```json
{
  "title": "Estudar Angular",
  "description": "Revisar signals e HttpClient",
  "isCompleted": false
}
```

> No `POST`, o backend usa `title` e `description`. O campo `isCompleted` é aplicado no `PUT`.

## Frontend

Em outro terminal:

```bash
cd frontend
npm install
ng serve
```

Acesse: **http://localhost:4200**

O frontend consome a API em `http://localhost:3000` (CORS liberado para `localhost:4200`).

### Fluxo de autenticação na interface

1. Abra http://localhost:4200 → tela de **Login**
2. Se ainda não tiver conta, use **Cadastre-se** (`/register`)
3. Após login/registro bem-sucedido, o token JWT é salvo no `localStorage`
4. Você é redirecionado para `/tasks`
5. Um interceptor HTTP envia automaticamente `Authorization: Bearer <token>` nas chamadas à API
6. A rota `/tasks` é protegida por um guard (sem token, volta ao login)
7. Use **Logout** para limpar o token e sair

## Funcionalidades

- Autenticação com JWT (register / login / logout)
- Listar todas as tarefas cadastradas
- Criar tarefa (modal)
- Editar tarefa na própria linha da tabela
- Excluir tarefa (com confirmação)
- Marcar como pendente ou concluída

## Como rodar o projeto completo

1. MySQL ativo com o banco `todo`
2. Configurar `backend/.env` (`DATABASE_URL` + `JWT_SECRET`)
3. Backend: `cd backend && npm run dev`
4. Frontend: `cd frontend && ng serve`
5. Abrir http://localhost:4200
6. Registrar um usuário, fazer login e usar o CRUD de tasks

## Observações

- Backend em modo desenvolvimento: `tsx watch` (reinicia ao salvar)
- Frontend em modo desenvolvimento: hot reload do Angular CLI
- ORM permitido pelo enunciado: Prisma
- Extra do desafio: autenticação JWT implementada
