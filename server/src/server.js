import express from 'express';
import { OpenAI } from 'openai';
import sequelize from './config/database.js'; // Importa a configuração do banco de dados
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' }); // Carrega variáveis do .env

const app = express();
const port = process.env.PORT || 5000;


// Configuração da OpenAI com sua chave de API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use a variável do .env
});

// Middleware para processar o corpo da requisição
app.use(express.json());

// Rotas
// app.use('/api/quotes', quoteRoutes);

// Testando a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

// Rota para gerar o formulário de cotação
app.post('/api/generate-form', async (req, res) => {
  try {
    const { quote } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: quote }],
    });

    const message = response.choices[0].message.content;
    res.json({ formData: message });
  } catch (error) {
    console.error('Erro ao processar o pedido:', error);
    res.status(500).json({ error: 'Erro ao processar o pedido.' });
  }
});

// Inicia o servidor na porta especificada
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
  console.log(`Servidor rodando na porta ${port}`);
});