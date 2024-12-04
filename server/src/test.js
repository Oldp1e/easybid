import sequelize from './config/database.js'; // Importa a instância do Sequelize
import { User, Quote } from './models/index.js';  // Importa os modelos

const testDatabase = async () => {
  try {
    // Tenta inserir um novo usuário
    const newUser = await User.create({
      username: 'testuser',
      password: 'testpassword', // Aqui, use uma senha já criptografada, se necessário
      email: 'testuser@example.com',
      role: 'customer',
    });

    console.log('Usuário inserido com sucesso:', newUser);

    // Tenta inserir uma cotação para esse usuário
    const newQuote = await Quote.create({
      user_id: newUser.id,
      item: 'Produto Teste',
      quantity: 100,
      expected_date: '10 dias',
      status: 'pending',
    });

    console.log('Cotação inserida com sucesso:', newQuote);

  } catch (error) {
    console.error('Erro ao testar o banco de dados:', error);
  } finally {
    // Encerra a aplicação após o teste
    process.exit();
  }
};

testDatabase();
