import sequelize from './config/database.js';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Força a recriação das tabelas
    console.log('Banco de dados sincronizado com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  } finally {
    process.exit();
  }
};

syncDatabase();
