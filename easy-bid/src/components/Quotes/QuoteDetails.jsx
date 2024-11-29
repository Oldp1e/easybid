import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, List, Typography } from 'antd';
import './QuoteDetails.css';

const { Title, Text } = Typography;

const QuoteDetails = () => {
  const { id } = useParams(); // Pega o ID da cotação da URL
  const navigate = useNavigate(); // Hook para navegar entre páginas

  // Simulei os dados baseados no ID
  const quote = {
    id,
    item: 'Fralda Pampers',
    quantity: '5000 unidades',
    expectedDate: '5 dias',
    status: 'Em andamento',
    details: 'Cotação para fornecimento de fraldas para uma empresa.',
  };

  // Simulação das respostas dos fornecedores
  const supplierResponses = [
    {
      id: 1,
      supplier: 'Fornecedor A',
      price: 'R$ 15.000,00',
      deliveryTime: '7 dias',
      status: 'Aprovado',
    },
    {
      id: 2,
      supplier: 'Fornecedor B',
      price: 'R$ 14.500,00',
      deliveryTime: '8 dias',
      status: 'Aprovado',
    },
    {
      id: 3,
      supplier: 'Fornecedor C',
      price: 'R$ 16.000,00',
      deliveryTime: '6 dias',
      status: 'Aguardando resposta',
    },
  ];

  // Função para redirecionar para a página de resposta do fornecedor
  const handleViewAnswer = (supplierId) => {
    navigate(`/quote-answer/${supplierId}`);
  };

  const handleNovaCotacao = () => {
    navigate('/quote-prompt'); // Redireciona para a página de nova cotação
  };

  return (
    <div className="quote-details-container">
      <h2>Detalhes da Cotação</h2>
      <Card title={quote.item}>
        <p><strong>Quantidade:</strong> {quote.quantity}</p>
        <p><strong>Data Esperada:</strong> {quote.expectedDate}</p>
        <p><strong>Status:</strong> {quote.status}</p>
        <p><strong>Detalhes:</strong> {quote.details}</p>
      </Card>

      <Title level={3}>Resumo da Cotação</Title>
      <Card bordered={false} style={{ marginBottom: '20px' }}>
        <p><strong>Item:</strong> {quote.item}</p>
        <p><strong>Quantidade:</strong> {quote.quantity}</p>
        <p><strong>Data Esperada:</strong> {quote.expectedDate}</p>
      </Card>

      <Title level={4}>Respostas dos Fornecedores</Title>
      <List
        itemLayout="horizontal"
        dataSource={supplierResponses}
        renderItem={(response) => (
          <List.Item
            key={response.id}
            onClick={() => handleViewAnswer(response.id)}
            style={{ cursor: 'pointer' }}
          >
            <List.Item.Meta
              title={response.supplier}
              description={
                <div>
                  <Text strong>Preço: </Text>{response.price}<br />
                  <Text strong>Prazo de Entrega: </Text>{response.deliveryTime}<br />
                  <Text strong>Status: </Text>{response.status}
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Button
        type="primary"
        size="large"
        style={{ marginTop: '16px' }}
        onClick={handleNovaCotacao}
      >
        Nova Cotação
      </Button>
    </div>
  );
};

export default QuoteDetails;
