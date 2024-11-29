import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom'; // Importando o Link para redirecionamento
import './ForgotPassword.css';

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    const { email } = values;

    // Simular o envio de um e-mail de recuperação
    setTimeout(() => {
      message.success(`E-mail de recuperação enviado para ${email}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Esqueci minha senha</h2>
        <Form
          name="forgot-password"
          onFinish={handleSubmit}
          layout="vertical"
          className="forgot-password-form"
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu e-mail!' },
              { type: 'email', message: 'E-mail inválido!' },
            ]}
          >
            <Input size="large" placeholder="Digite seu e-mail" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Enviar link de recuperação
            </Button>
          </Form.Item>

          <Form.Item>
            <Link to="/login">
              <Button type="link" block>
                Voltar para login
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
