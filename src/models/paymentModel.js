const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
// const { sequelize } = require('../config/db_remote'); // Para la base de datos remota

const Payment = sequelize.define('Payment', {
  payment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'order_id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false
  },
  paid_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
    // e.g., 'credit_card', 'paypal', 'cash_on_delivery'
  },
}, {
  tableName: 'payments',
  createdAt: 'created_at',
  updatedAt: true
});

module.exports = Payment;