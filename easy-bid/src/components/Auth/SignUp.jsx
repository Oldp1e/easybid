import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import './SignUp.css';

const mockDatabase = {
  // Banco de dados fictício para simulação
  users: [],
};

const SignupPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSignup = (values) => {
    setLoading(true);
    const { username, email, password, confirmPassword } = values;

    // Validação simples
    if (password !== confirmPassword) {
      message.error('As senhas não coincidem!');
      setLoading(false);
      return;
    }

    // Simula o cadastro de um novo usuário
    mockDatabase.users.push({ username, email, password });
    message.success('Cadastro realizado com sucesso!');

    // Redirecionar ou limpar o formulário após sucesso
    setLoading(false);
    // Se estiver usando react-router-dom, pode redirecionar com:
    // history.push('/login');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Crie sua conta</h2>
        <Form
          name="signup"
          onFinish={handleSignup}
          layout="vertical"
          className="signup-form"
        >
          <Form.Item
            label="Nome de usuário"
            name="username"
            rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
          >
            <Input size="large" placeholder="Digite seu nome de usuário" />
          </Form.Item>

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

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password size="large" placeholder="Digite sua senha" />
          </Form.Item>

          <Form.Item
            label="Confirmar Senha"
            name="confirmPassword"
            rules={[{ required: true, message: 'Por favor, confirme sua senha!' }]}
          >
            <Input.Password size="large" placeholder="Confirme sua senha" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Criar Conta
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" href="/login" block>
              Já tem uma conta? Entre aqui.
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
