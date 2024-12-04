import { DataTypes } from 'sequelize';
import sequelize from '..//config/database.js';

const Quote = sequelize.define('Quote', {
  item: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expected_date: {
    type: DataTypes.STRING(50),
  },
  status: {
    type: DataTypes.ENUM('pending', 'resolved'),
    defaultValue: 'pending',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'quotes',
  timestamps: false,
});

Quote.associate = (models) => {
  Quote.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  Quote.hasMany(models.SupplierResponse, { foreignKey: 'quote_id', onDelete: 'CASCADE' });
};

export default Quote;
