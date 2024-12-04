import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SupplierResponse = sequelize.define('SupplierResponse', {
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  delivery_time: {
    type: DataTypes.STRING(50),
  },
  additional_details: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'supplier_responses',
  timestamps: false,
});

SupplierResponse.associate = (models) => {
  SupplierResponse.belongsTo(models.Quote, { foreignKey: 'quote_id', onDelete: 'CASCADE' });
  SupplierResponse.belongsTo(models.User, { foreignKey: 'supplier_id', onDelete: 'CASCADE' });
  SupplierResponse.hasMany(models.Message, { foreignKey: 'response_id', onDelete: 'CASCADE' });
};

export default SupplierResponse;
