# **Quote System**  

## **Descrição do Projeto**  
O **Quote System** é uma aplicação web projetada para facilitar o processo de cotações entre clientes e fornecedores. O sistema permite que clientes descrevam suas necessidades em um campo de entrada simples, e com base em seu input, o sistema gera formulários de cotação automaticamente. Essas cotações são enviadas para fornecedores, que podem responder com preços e detalhes. Além disso, o sistema oferece uma interface para que clientes e fornecedores interajam diretamente através de um chat, promovendo negociações rápidas e eficazes.

> **Aviso:** Este repositório é privado, e todo o código nele contido está protegido por direitos autorais. Não compartilhe ou redistribua este projeto sem permissão expressa.

---

## **Funcionalidades Principais**
1. **Criação de Cotações**  
   - Campo de entrada simples para os clientes descreverem o que desejam comprar.
   - Geração automática de formulários com base nos dados inseridos.

2. **Gerenciamento de Respostas dos Fornecedores**  
   - Fornecedores podem enviar propostas de preço e prazos de entrega.  
   - Clientes podem revisar e negociar com os fornecedores diretamente.

3. **Chat em Tempo Real**  
   - Interface de mensagens para clientes e fornecedores discutirem detalhes específicos da cotação.  

4. **Sistema de Gerenciamento de Status**  
   - Marque cotações como resolvidas assim que o processo for concluído.

5. **Autenticação de Usuários**  
   - Suporte para múltiplos papéis: **Cliente** e **Fornecedor**.  

---

## **Estrutura do Projeto**
O projeto é dividido em frontend e backend:  

### **Frontend**  
- **Framework**: ReactJS  
- **Gerenciador de Pacotes**: pnpm  
- **Estilo**: Ant Design para componentes e CSS personalizado.  
- **Páginas Principais**:  
  - **QuotePrompt**: Criação de cotações.  
  - **WaitingList**: Página de aguardo das respostas dos fornecedores.  
  - **QuoteList**: Lista de cotações criadas pelo cliente.  
  - **QuoteDetails**: Detalhes de uma cotação específica.  
  - **QuoteAnswer**: Chat com o fornecedor.

### **Backend**  
- **Banco de Dados**: MySQL  
- **API**: Node.js com Express  
- **Autenticação**: JWT (JSON Web Tokens) para autenticação e autorização.  

---

## **Configuração do Ambiente de Desenvolvimento**
### **Pré-requisitos**  
Certifique-se de ter instalado:  
- Node.js  
- pnpm  
- MySQL  

### **Passos para Configuração**
1. Clone este repositório:  
   ```bash
   git clone <url_do_repositorio>
   cd quote-system
   ```

2. Instale as dependências do projeto:  
   ```bash
   pnpm install
   ```

3. Configure o banco de dados:  
   - Crie um banco de dados MySQL com os comandos fornecidos no arquivo `db_schema.sql`.  

4. Configure o backend:  
   - Renomeie o arquivo `.env.example` para `.env`.  
   - Adicione as variáveis de ambiente necessárias:  
     ```plaintext
     DB_HOST=localhost
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_NAME=quote_system
     JWT_SECRET=sua_chave_secreta
     ```

5. Inicie o servidor backend:  
   ```bash
   pnpm run server
   ```

6. Inicie o frontend:  
   ```bash
   pnpm run dev
   ```

---

## **Rotas Principais**
### **Frontend**
- `/quote-prompt`: Página inicial para criar cotações.  
- `/waiting-list`: Tela de aguardo para respostas de fornecedores.  
- `/quote-list`: Lista de cotações criadas pelo cliente.  
- `/quote-details/:id`: Visualizar detalhes de uma cotação específica.  
- `/quote-answer/:id`: Chat com o fornecedor relacionado à cotação.  

### **Backend**
- **POST** `/api/auth/login`: Login do usuário.  
- **POST** `/api/quotes`: Criar uma nova cotação.  
- **GET** `/api/quotes`: Listar cotações.  
- **POST** `/api/responses`: Adicionar resposta de fornecedor.  
- **GET** `/api/responses/:quoteId`: Listar respostas de fornecedores para uma cotação.  

---

## **Licença**  
Este projeto é **proprietário** e não está licenciado sob nenhuma licença de código aberto. A redistribuição ou uso comercial sem autorização é estritamente proibida.  

Para mais informações, entre em contato com o proprietário do repositório.
