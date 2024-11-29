import React, { useState } from 'react';
import { Form, Input, Button, Radio, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './OnBoarding.css';

const onboardingQuestions = [
  {
    id: 1,
    question: "Como podemos te chamar?",
    type: "text",
    options: []
  },
  {
    id: 2,
    question: "O que você deseja fazer na Easy Bid?",
    type: "radio",
    options: [
      { label: "Quero comprar!", value: "comprar" },
      { label: "Quero vender!", value: "vender" },
      { label: "Quero comprar e vender!", value: "comprar_vender" }
    ]
  }
];

const OnboardingPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false); // Para controlar quando o onboarding é concluído
  const navigate = useNavigate();

  const currentQuestion = onboardingQuestions[currentQuestionIndex];

  const handleNext = (values) => {
    setLoading(false);
    const updatedAnswers = { ...answers, ...values };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < onboardingQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finalizou o onboarding, exibe o card de boas-vindas
      setOnboardingComplete(true);
      message.success("Onboarding concluído com sucesso!");
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRedirectToQuotePrompt = () => {
    navigate('/quote-prompt'); // Navega para a página de cotação
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        {onboardingComplete ? (
          // Exibe o card de boas-vindas após a finalização
          <div className="welcome-card">
            <Card title="Bem-vindo ao EasyBid!" bordered={false}>
              <p><strong>PARA BUYERS:</strong></p>
              <ul>
                <li>Solicitar cotações rapidamente</li>
                <li>Receber cotações em tempo recorde</li>
                <li>Entrar em contato com diversos fornecedores</li>
              </ul>
              <p><strong>PARA SUPPLIERS:</strong></p>
              <ul>
                <li>Leads grátis</li>
                <li>Se livrar de inventário parado</li>
                <li>Diversificar a carteira de clientes</li>
              </ul>
              <Button 
                type="primary" 
                onClick={handleRedirectToQuotePrompt} 
                size="large" 
                block
              >
                Show!
              </Button>
            </Card>
          </div>
        ) : (
          // Exibe o formulário de onboarding se não estiver concluído
          <Form
            name="onboarding"
            onFinish={handleNext}
            layout="vertical"
            className="onboarding-form"
          >
            <h2 className="onboarding-title">Onboarding</h2>

            <div className="onboarding-question">
              <h3>{currentQuestion.question}</h3>

              {currentQuestion.type === 'text' && (
                <Form.Item
                  name={`question_${currentQuestion.id}`}
                  rules={[{ required: true, message: 'Por favor, responda a pergunta!' }]}
                >
                  <Input size="large" placeholder="Digite sua resposta" />
                </Form.Item>
              )}

              {currentQuestion.type === 'radio' && (
                <Form.Item
                  name={`question_${currentQuestion.id}`}
                  rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                >
                  <Radio.Group size="large">
                    {currentQuestion.options.map(option => (
                      <Radio key={option.value} value={option.value}>
                        {option.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              )}
            </div>

            <div className="onboarding-actions">
              {currentQuestionIndex > 0 && (
                <Button onClick={handlePrev} style={{ marginRight: '16px' }}>
                  Voltar
                </Button>
              )}

              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
              >
                {currentQuestionIndex < onboardingQuestions.length - 1 ? "Próximo" : "Finalizar"}
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
