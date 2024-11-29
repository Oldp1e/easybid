-- Criar o banco de dados
CREATE DATABASE easy_bid_bd;
USE easy_bid_bd;

-- Tabela de Usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('customer', 'supplier') NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Cotações
CREATE TABLE quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- Relacionado ao cliente que criou a cotação
    item VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    expected_date VARCHAR(50),
    status ENUM('pending', 'resolved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de Respostas dos Fornecedores
CREATE TABLE supplier_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quote_id INT NOT NULL, -- Relacionado à cotação
    supplier_id INT NOT NULL, -- Relacionado ao fornecedor que respondeu
    price DECIMAL(10, 2) NOT NULL,
    delivery_time VARCHAR(50),
    additional_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de Mensagens do Chat
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    response_id INT NOT NULL, -- Relacionado à resposta do fornecedor
    sender_id INT NOT NULL, -- Quem enviou a mensagem (cliente ou fornecedor)
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (response_id) REFERENCES supplier_responses(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Índices para otimizar consultas
CREATE INDEX idx_user_quotes ON quotes(user_id);
CREATE INDEX idx_quote_responses ON supplier_responses(quote_id);
CREATE INDEX idx_response_messages ON messages(response_id);

-- Dados mocados
-- Inserindo um cliente
INSERT INTO users (username, password, email, role)
VALUES 
('customer1', 'hashed_password', 'customer1@example.com', 'customer'),
('supplier1', 'hashed_password', 'supplier1@example.com', 'supplier');

-- Inserindo uma cotação
INSERT INTO quotes (user_id, item, quantity, expected_date, status)
VALUES 
(1, 'Fralda Pampers', 5000, '5 dias', 'pending');

-- Inserindo uma resposta de fornecedor
INSERT INTO supplier_responses (quote_id, supplier_id, price, delivery_time, additional_details)
VALUES 
(1, 2, 15000.00, '7 dias', 'Produto entregue diretamente da fábrica. Alta qualidade.');

-- Inserindo mensagens no chat
INSERT INTO messages (response_id, sender_id, message)
VALUES 
(1, 2, 'Olá, podemos fornecer o produto solicitado por R$ 15.000,00 com entrega em 7 dias.'),
(1, 1, 'Olá, por favor, me envie mais detalhes sobre o produto.'),
(1, 2, 'Claro, o produto é de alta qualidade, entregue diretamente da fábrica. Podemos incluir um desconto dependendo da quantidade.');
