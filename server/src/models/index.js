import Sequelize from 'sequelize';
import sequelize from '../config/database.js'; // Sua configuração do Sequelize

// Importando todos os modelos
import User from './user.js';
import Quote from './Quote.js';
import SupplierResponse from './SupplierResponse.js';
import Message from './Message.js';

// Associando os modelos ao sequelize
const models = {
  User,
  Quote,
  SupplierResponse,
  Message,
};

// Fazendo associações
User.hasMany(Quote, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Quote.belongsTo(User, { foreignKey: 'user_id' });

Quote.hasMany(SupplierResponse, { foreignKey: 'quote_id', onDelete: 'CASCADE' });
SupplierResponse.belongsTo(Quote, { foreignKey: 'quote_id' });

SupplierResponse.hasMany(Message, { foreignKey: 'response_id', onDelete: 'CASCADE' });
Message.belongsTo(SupplierResponse, { foreignKey: 'response_id' });

User.hasMany(SupplierResponse, { foreignKey: 'supplier_id', onDelete: 'CASCADE' });
SupplierResponse.belongsTo(User, { foreignKey: 'supplier_id' });

User.hasMany(Message, { foreignKey: 'sender_id', onDelete: 'CASCADE' });
Message.belongsTo(User, { foreignKey: 'sender_id' });

// Exportando os modelos para uso em outros arquivos
export { User, Quote, SupplierResponse, Message };
export default models;
