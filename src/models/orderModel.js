const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
// const { sequelize } = require('../config/db_remote'); // Para la base de datos remota

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM(
      "Approved", "Rejected", "Pending"),
    defaultValue: 'Pending'
  },
  total_amount: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false
  },
  shipping_address: {
  type: DataTypes.STRING,
  allowNull: true
  },
}, {
  tableName: 'orders',
  createdAt: 'created_at',
  updatedAt: true
});

Order.associate = (models) => {
  Order.belongsTo(models.User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Order.hasMany(models.OrderItem, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

module.exports = Order;
