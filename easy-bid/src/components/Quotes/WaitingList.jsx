import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './WaitingList.css';

// Aqui você pode usar qualquer ilustração, vou colocar uma como exemplo.
import waitingIllustration from '../../assets/images/order-filled.svg';

const WaitingList = () => {
  const navigate = useNavigate();

  const handleCotarOutroProduto = () => {
    navigate('/quote-prompt'); // Redireciona para a página de cotação
  };

  const handleVerMinhasCotacoes = () => {
    navigate('/quote-list'); // Redireciona para a página de lista de cotações (onde o usuário pode ver cotações anteriores)
  };

  return (
    <div className="waiting-list-container">
      <Card className="waiting-card" bordered={false}>
        <div className="waiting-content">
          <img
            src={waitingIllustration}
            alt="Aguardando fornecedores"
            className="waiting-illustration"
          />
          <h2 className="waiting-message">Cotação confirmada!</h2>
          <div className="waiting-actions">
            <Button
              type="primary"
              size="large"
              onClick={handleCotarOutroProduto}              
            >
              Cotar outro produto
            </Button>
            <Button
              size="large"
              onClick={handleVerMinhasCotacoes}
            >
              Ver minhas cotações
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WaitingList;
