# Auth Service

Este projeto é um serviço de autenticação desenvolvido com [NestJS](https://nestjs.com/) e [TypeORM](https://typeorm.io/), utilizando PostgreSQL como banco de dados.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão **20.x** ou superior)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

## Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd auth-service
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Configure as variáveis de ambiente:

   - Copie o arquivo `.env.example` para `.env`:

     ```bash
     cp .env.example .env
     ```

   - Edite o arquivo `.env` conforme necessário.

## Executando o Banco de Dados com Docker

1. Suba o container do PostgreSQL:

   ```bash
   docker-compose up -d
   ```

2. Verifique se o container está rodando:

   ```bash
   docker ps
   ```

## Executando a Aplicação

1. Compile o código TypeScript:

   ```bash
   yarn build
   ```

2. Execute as migrações do banco de dados:

   ```bash
   yarn migration:run
   ```

3. Inicie a aplicação em modo de desenvolvimento:

   ```bash
   yarn start:dev
   ```

4. A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

## Testes

1. Para rodar os testes unitários:

   ```bash
   yarn test
   ```

2. Para rodar os testes com cobertura:

   ```bash
   yarn test:cov
   ```

## Documentação da API

A documentação da API está disponível em [Swagger](https://swagger.io/). Após iniciar a aplicação, acesse:

```
http://localhost:3000/docs
```

## Scripts Úteis

- **Criar banco de dados**:

  ```bash
  yarn db:create
  ```

- **Reverter migrações**:

  ```bash
  yarn migration:revert
  ```

- **Gerar nova migração**:

  ```bash
  yarn migration:gen
  ```

- **Limpar cache de migrações**:

  ```bash
  yarn migration:cache
  ```

## Estrutura do Projeto

- **src**: Contém o código-fonte da aplicação.
  - **modules**: Módulos organizados por domínio.
  - **domain**: Interfaces, entidades e tipos do domínio.
  - **infrastructure**: Configurações e implementações de infraestrutura.
  - **commons**: Utilitários e classes comuns.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature/bugfix: `git checkout -b minha-feature`.
3. Commit suas alterações: `git commit -m 'Minha nova feature'`.
4. Envie para o repositório remoto: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença **UNLICENSED**.
