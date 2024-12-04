import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import SupplierResponse from './SupplierResponse.js';
import Message from './Message.js';


const User = sequelize.define('User', {
  username: { type: DataTypes.STRING(50), unique: true, allowNull: false },
  password: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  role: { type: DataTypes.ENUM('customer', 'supplier'), defaultValue: 'customer', allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'users', timestamps: false });

User.hasMany(SupplierResponse, { foreignKey: 'supplier_id', onDelete: 'CASCADE' });
User.hasMany(Message, { foreignKey: 'sender_id', onDelete: 'CASCADE' });

export default User;
