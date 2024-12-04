import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Message = sequelize.define('Message', {
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sent_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'messages',
  timestamps: false,
});

Message.associate = (models) => {
  Message.belongsTo(models.SupplierResponse, { foreignKey: 'response_id', onDelete: 'CASCADE' });
  Message.belongsTo(models.User, { foreignKey: 'sender_id', onDelete: 'CASCADE' });
};

export default Message;
