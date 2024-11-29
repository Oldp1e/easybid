// App.jsx
import React from 'react';
import { Layout } from 'antd';
import QuotePrompt from './components/QuotePrompt';
import './App.css'; // Estilos adicionais para centralizar

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout className="app-layout">      
        <QuotePrompt />      
    </Layout>
  );
};

export default App;
