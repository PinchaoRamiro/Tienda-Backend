const { sequelize, connectDB } = require('../config/db');

// Modelos
const User = require('./userModel');
const Product = require('./productModel');
const Category = require('./categoryModel');
const Order = require('./orderModel');
const OrderItem = require('./orderItemModel');

// Relaciones

// Usuario tiene muchas órdenes
User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Order.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Categoría tiene muchos productos
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

// Orden tiene muchos items
Order.hasMany(OrderItem, {
  foreignKey: 'order_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Producto puede estar en muchos items
Product.hasMany(OrderItem, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
OrderItem.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Sincronización de la DB
const syncDB = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  connectDB,
  syncDB,
  User,
  Product,
  Category,
  Order,
  OrderItem
};
