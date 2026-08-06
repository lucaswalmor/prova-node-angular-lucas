# TechX — Gerenciador de Tarefas

Aplicação full stack de to-do list desenvolvida como desafio técnico: listagem, criação, edição, exclusão e marcação de tarefas como concluídas.

## Stack

| Camada | Tecnologias |
|---|---|
| Frontend | Angular 21, Tailwind CSS, RxJS |
| Backend | Node.js, TypeScript, Express |
| Banco | MySQL + Prisma ORM |

## Estrutura do projeto

```
prova/
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

3. Para o Prisma CLI (migrate/generate), crie um arquivo `backend/.env`:

```env
DATABASE_URL="mysql://root@127.0.0.1:3306/todo"
```

Se houver senha:

```env
DATABASE_URL="mysql://root:SUA_SENHA@127.0.0.1:3306/todo"
```

## Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

A API sobe em: **http://localhost:3000**

### Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/tasks` | Lista todas as tarefas |
| `GET` | `/tasks/:id` | Busca uma tarefa |
| `POST` | `/tasks` | Cria uma tarefa |
| `PUT` | `/tasks/:id` | Atualiza uma tarefa |
| `DELETE` | `/tasks/:id` | Remove uma tarefa |

#### Exemplo de body (`POST` / `PUT`)

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

## Funcionalidades

- Listar todas as tarefas cadastradas
- Criar tarefa (modal)
- Editar tarefa na própria linha da tabela
- Excluir tarefa (com confirmação)
- Marcar como pendente ou concluída

## Como rodar o projeto completo

1. MySQL ativo com o banco `todo`
2. Backend: `cd backend && npm run dev`
3. Frontend: `cd frontend && ng serve`
4. Abrir http://localhost:4200

## Observações

- Backend em modo desenvolvimento: `tsx watch` (reinicia ao salvar)
- Frontend em modo desenvolvimento: hot reload do Angular CLI
- ORM permitido pelo enunciado: Prisma
