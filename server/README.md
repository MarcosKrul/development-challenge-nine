# Setup

* Comum para os dois projetos (client e server)

```
  mkdir folder-name
  cd folder-name
  git clone https://github.com/MarcosKrul/development-challenge-nine.git .
```

* Para o server

```
  cd server
  cp .env.example .env.development
  yarn
  yarn dev:server
```

* É necessário completar as variáveis de ambiente no arquivo ***.env.development*** criado na raíz do projeto server

# Banco de dados

* Formato da ***connection string*** do banco

```
    postgres://USER:PASSWORD@HOST:PORT/DB_NAME
```

* Criar a database e rodas as migrations

```
    yarn prisma:migrate:dev
```
