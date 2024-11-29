import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Input, List, Typography, Space, message } from 'antd';
import { SendOutlined, CheckOutlined } from '@ant-design/icons';
import './QuoteAnswer.css';

const { Title, Text } = Typography;

const QuoteAnswer = () => {
  const { id } = useParams(); // Pega o ID da resposta (da cotação)
  const navigate = useNavigate();

  // Simulando a conversa com o fornecedor para o ID da cotação
  const [messages, setMessages] = useState([
    { sender: 'Fornecedor A', message: 'Olá, podemos fornecer o produto solicitado por R$ 15.000,00 com entrega em 7 dias.', time: '10:00' },
    { sender: 'Cliente', message: 'Olá, por favor, me envie mais detalhes sobre o produto.', time: '10:05' },
    { sender: 'Fornecedor A', message: 'Claro, o produto é de alta qualidade, entregue diretamente da fábrica. Podemos incluir um desconto dependendo da quantidade.', time: '10:10' },
    { sender: 'Cliente', message: 'Interessante! Poderiam diminuir o preço para R$ 14.000,00? E a entrega para 5 dias?', time: '10:15' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  // Função para enviar nova mensagem
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'Cliente', message: newMessage, time: 'Agora' }]);
      setNewMessage('');
    }
  };

  // Função para voltar para a tela anterior
  const handleBackToQuoteDetails = () => {
    navigate(`/quote-details/${id}`);
  };

  // Função para marcar a cotação como resolvida
  const handleMarkAsResolved = () => {
    message.success('Cotação marcada como resolvida!');
    navigate('/quote-list'); // Redireciona para a lista de cotações após marcar como resolvida
  };

  return (
    <div className="quote-answer-container">
      <Space style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleBackToQuoteDetails}>
          Voltar para Cotação
        </Button>
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={handleMarkAsResolved}
        >
          Marcar Cotação como Resolvida
        </Button>
      </Space>

      <Card title="Conversa com o Fornecedor">
        <Title level={4}>Resumo da Cotação</Title>
        <p><strong>ID da Cotação:</strong> {id}</p>
        <p><strong>Fornecedor:</strong> Fornecedor A</p>

        <List
          itemLayout="vertical"
          size="large"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<Text strong>{item.sender}</Text>}
                description={<Text>{item.message}</Text>}
              />
              <div style={{ textAlign: 'right', fontSize: '12px' }}>
                <Text type="secondary">{item.time}</Text>
              </div>
            </List.Item>
          )}
        />

        <Space direction="vertical" style={{ width: '100%', marginTop: '16px' }}>
          <Input.TextArea
            rows={4}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem aqui..."
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            style={{ width: '100%' }}
          >
            Enviar
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default QuoteAnswer;
