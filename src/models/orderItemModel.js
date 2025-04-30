const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrderItem = sequelize.define('OrderItem', {
  order_item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'orders',
      key: 'order_id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products',
      key: 'product_id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'order_items',
  timestamps: false
});

OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Order, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  OrderItem.belongsTo(models.Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

module.exports = OrderItem;
