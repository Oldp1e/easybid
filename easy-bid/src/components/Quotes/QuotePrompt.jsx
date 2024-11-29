// QuotePrompt.jsx
import React, { useState } from 'react';
import { Input, Button, Spin, Form, Row, Col, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from 'react-router-dom';
import './QuotePrompt.css';

const QuotePrompt = () => {
  const [quote, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const prompt = `O cliente deseja fazer a seguinte compra: "${quote}". 
  Por favor, extraia os dados do pedido e retorne um JSON com as seguintes informações:
  - "item": O nome do item que o cliente quer comprar. Se não for possível identificar, retorne -1.
  - "qnt": A quantidade de unidades do item que o cliente quer comprar. Se não for possível identificar, retorne -1.
  - "date_expected": A data de entrega ou prazo, se informado. Se não for possível determinar, retorne -1.
  
  Exemplo:
  "item": "fralda pampers",
  "qnt": 5000,
  "date_expected": "10 dias"

  Caso não seja possível identificar alguma informação, retorne '', como no exemplo abaixo:
  Caso não seja possível compreender o pedido retorne apenas {wrong_prompt:1}
  {
    "item": '',
    "qnt": '',
    "date_expected": ''
  }`;

  const handleGenerateForm = async () => {
  
  
    if (!quote.trim()) {
      alert('Por favor, insira algo para gerar o formulário.');
      return;
    }

    setLoading(true);
    setResponse('');
    /*Temporary piece of code*/

    //setResponse({item:'Fralda Pampers', qnt:'5000 unidades',date_expected:'5 dias'});
    setLoading(false);
    /*------------------------------------------------*/
    try {
      const res = await fetch('/api/generate-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote:prompt, }),
      });
      const data = await res.json();
      setResponse(JSON.parse(data.formData));
    } catch (error) {
        console.error('Erro ao gerar a cotação:', error);
        setResponse('Erro ao processar o pedido.');
    } finally {
        setLoading(false);
    }
  };

  const handleEdit = () => {
    setResponse(null); // Permite editar o pedido
  };

  const handleConfirm = () => {
    message.success('Pedido confirmado! A cotação será processada.');    
    navigate('/waiting-list');   
  };

  return (
    <div className="quote-prompt-container">
       <Form.Item
          //label="Digite o que deseja cotar"
          help="Escreva de forma clara a quantidade, descrição do produto e quantos dias esperados para receber o pedido"
          validateStatus="info" // Aqui você pode personalizar o status de validação (info, success, warning, error)
        >
          <Input
            size="large"
            placeholder="Digite o que deseja cotar..."
            value={quote}
            onChange={(e) => setPrompt(e.target.value)}
            suffix={<FontAwesomeIcon icon={faSearch} onClick={handleGenerateForm} />}
            aria-label="Escreva de forma clara a quantidade, descrição do produto, e quantos dias esperados para receber o pedido"
          />
        </Form.Item>

      {loading && <Spin style={{ marginTop: '16px' }} />}

      {response && (
        <div className="generated-form" style={{ marginTop: '24px' }}>
          <h3>É isso mesmo que deseja cotar?</h3>

          {/* Grid simples com linhas e colunas */}
          <Row gutter={16}>
            <Col span={8}>
              <strong>Item:</strong>
              <p>{response.item !== -1 ? response.item : 'Informação não compreendida'}</p>
            </Col>
            <Col span={8}>
              <strong>Quantidade:</strong>
              <p>{response.qnt !== -1 ? response.qnt : 'Informação não compreendida'}</p>
            </Col>
            <Col span={8}>
              <strong>Data Esperada:</strong>
              <p>{response.date_expected !== -1 ? response.date_expected : 'Informação não compreendida'}</p>
            </Col>
          </Row>

          <div style={{ marginTop: '24px' }}>
            <Button type="primary" onClick={handleConfirm} style={{ marginRight: '16px' }}>
              Sim
            </Button>
            <Button onClick={handleEdit}>Editar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotePrompt;
