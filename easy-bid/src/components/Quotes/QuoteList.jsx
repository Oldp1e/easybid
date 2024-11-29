import React from 'react';
import { List, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './QuoteList.css';
import { Content } from 'antd/es/layout/layout';

// Dados mocados das cotações
const mockQuotes = [
  {
    id: 1,
    item: 'Fralda Pampers',
    quantity: '5000 unidades',
    expectedDate: '5 dias',
    status: 'Em andamento',
  },
  {
    id: 2,
    item: 'Smartphone Samsung',
    quantity: '100 unidades',
    expectedDate: '10 dias',
    status: 'Aguardando fornecedores',
  },
  {
    id: 3,
    item: 'Cadeira Escritório',
    quantity: '20 unidades',
    expectedDate: '7 dias',
    status: 'Concluída',
  },
];

const QuoteList = () => {
  const navigate = useNavigate();

  const handleViewQuote = (quoteId) => {
    navigate(`/quote-details/${quoteId}`); // Navegar para os detalhes da cotação
  };

  const handleNewQuote = (quoteId) => {
    navigate(`/quote-prompt`); // Navegar para os detalhes da cotação
  };

  return (
    <div className="quote-list-container">
      <h2>Minhas Cotações</h2>   
      <Button
        type="primary"
        size="large"
        style={{ marginTop: '16px' }}
        onClick={handleNewQuote}
    >
       Cotar
    </Button>  
      <List
        itemLayout="vertical"
        size="large"
        dataSource={mockQuotes}
        renderItem={(quote) => (
          <List.Item
            key={quote.id}
            extra={<Button type="link" onClick={() => handleViewQuote(quote.id)}>Ver detalhes</Button>}
          >
            <Card
              title={quote.item}
              bordered={false}
              style={{ width: '100%' }}
            >
              <p><strong>Quantidade:</strong> {quote.quantity}</p>
              <p><strong>Data Esperada:</strong> {quote.expectedDate}</p>
              <p><strong>Status:</strong> {quote.status}</p>
            </Card>          
          </List.Item>          
        )}
      />     
    
     
    </div>
  );
};

export default QuoteList;
