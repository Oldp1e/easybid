import express from 'express';  // Certifique-se de que está usando "import"
import { OpenAI } from 'openai';  // Certifique-se de que está importando corretamente a biblioteca OpenAI

const app = express();
const port = 5000;

// Configuração da OpenAI com seu token
const openai = new OpenAI({
  apiKey: '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', // Substitua com sua chave de API
});

// Middleware para processar o corpo da requisição
app.use(express.json());

// Rota para gerar o formulário de cotação
app.post('/api/generate-form', async (req, res) => {
  try {
    const { quote } = req.body;

    // Enviando o prompt para o modelo da OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Ou 'gpt-4' dependendo de sua necessidade
      messages: [{ role: 'user', content: quote }],
    });

    // Retornando a resposta do modelo para o frontend
    const message = response.choices[0].message.content;
    res.json({ formData: message });
  } catch (error) {
    console.error('Erro ao processar o pedido:', error);
    res.status(500).json({ error: 'Erro ao processar o pedido.' });
  }
});

// Iniciando o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
