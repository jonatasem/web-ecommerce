# API de E-commerce 

Este projeto oferece um backend robusto para uma plataforma de e-commerce, lidando com autenticação de usuários, gerenciamento de produtos (pratos) e processamento de pedidos.

## 🚀 Funcionalidades

- *Gestão de Usuários:* Cadastro, autenticação e gerenciamento de contas de usuários.
- *Gestão de Pratos:* Adicionar, visualizar, atualizar e excluir itens de comida (pratos).
- *Processamento de Pedidos:* Criar, visualizar, atualizar e excluir pedidos de clientes.
- *Autenticação:* Login e registro seguro de usuários usando Passport.js e JWT.
- *Integração com Banco de Dados:* Integração perfeita com MongoDB para persistência de dados.
- *CORS Ativado:* Permite requisições de origem cruzada para integração flexível com o lado do cliente.

## 🛠️ Tecnologias Utilizadas

- *Node.js:* Ambiente de tempo de execução JavaScript.
- *Express.js:* Framework web rápido, minimalista e sem opiniões para Node.js.
- *MongoDB:* Banco de dados NoSQL para armazenar dados da aplicação.
- *Driver nativo do MongoDB:* Usado para interações diretas com o MongoDB.
- *Passport.js:* Middleware de autenticação para Node.js.
- *jsonwebtoken:* Para gerar e verificar JSON Web Tokens.
- *dotenv:* Para carregar variáveis de ambiente de um arquivo .env.
- *cors:* Middleware para habilitar o CORS.
- *Crypto:* Módulo embutido do Node.js para funcionalidade criptográfica (usado para hash de senhas).

## ⚙️ Configuração e Instalação

Siga estas etapas para ter a API de E-commerce funcionando em sua máquina local.

### Pré-requisitos

Certifique-se de ter o seguinte instalado:

- Node.js (LTS recomendado)
- MongoDB (rodando localmente ou uma instância na nuvem como MongoDB Atlas)

### 1. Clonar o Repositório

git clone [https://github.com/jonatasem/web-ecommerce](https://github.com/jonatasem/web-ecommerce.git)
cd web-ecommerce/backend

### 2. Instalar Dependências

npm install

### 3. Variáveis de Ambiente

Crie um arquivo .env na raiz do seu diretório de projeto e adicione as seguintes variáveis de ambiente:

MONGO_URI=mongodb://localhost:27017/ecommerce
MONGO_DB_NAME=seu_nome_de_banco_de_dados
JWT_SECRET=sua_chave_secreta_para_jwt

- *MONGO_URI:* Sua string de conexão MongoDB. Se você estiver executando o MongoDB localmente, o padrão geralmente é mongodb://localhost:27017/. Substitua ecommerce pelo nome do seu banco de dados desejado.
- *MONGO_DB_NAME:* O nome do banco de dados ao qual você deseja se conectar.
- *JWT_SECRET:* Uma chave secreta usada para assinar e verificar JSON Web Tokens. Gere uma string forte e aleatória para produção.

### 4. Executar a Aplicação

npm run start

A API estará rodando em http://localhost:3000

