import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Importando o Link para redirecionamento
import './Login.css';

const mockDatabase = {
  users: [
    {username:'teste',password:'teste'},
  ],
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values) => {
    setLoading(true);
    const { username, password } = values;

    const user = mockDatabase.users.find((user) => user.username === username && user.password === password);

    if (!user) {
      message.error('Credenciais inválidas!');
      setLoading(false);
      return;
    }

    message.success('Login realizado com sucesso!');

    setLoading(false);
    // Redirecionar para a página principal após login
    navigate('/quote-prompt');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Bem-vindo de volta!</h2>
        <Form
          name="login"
          onFinish={handleLogin}
          layout="vertical"
          className="login-form"
        >
          <Form.Item
            label="Nome de usuário"
            name="username"
            rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
          >
            <Input size="large" placeholder="Digite seu nome de usuário" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password size="large" placeholder="Digite sua senha" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Entrar
            </Button>
          </Form.Item>

          <Form.Item>
            <Link to="/signup">
              <Button type="link" block>
                Criar uma conta
              </Button>
            </Link>
            <Link to="/forgot-password">
              <Button type="link" block>
                Esqueci minha senha
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
