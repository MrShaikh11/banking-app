import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('deposit', 'withdrawal', 'transfer'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  fromUserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  toUserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'completed'
  }
});

// Define relationships
Transaction.belongsTo(User, { as: 'fromUser', foreignKey: 'fromUserId' });
Transaction.belongsTo(User, { as: 'toUser', foreignKey: 'toUserId' });
User.hasMany(Transaction, { as: 'sentTransactions', foreignKey: 'fromUserId' });
User.hasMany(Transaction, { as: 'receivedTransactions', foreignKey: 'toUserId' });

export default Transaction; 