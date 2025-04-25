const { sequelize, connectDB } = require('../config/db');

// Modelos
const User = require('./userModel');
const Product = require('./productModel');
const Category = require('./categoryModel');
const Order = require('./orderModel');
const OrderItem = require('./orderItemModel');

// Relaciones

// Usuario tiene muchas órdenes
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Categoría tiene muchos productos
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Orden tiene muchos items
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Producto puede estar en muchos items
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Sincronización de la DB
const syncDB = async () => {
  await sequelize.sync({ alter: true }); // o { force: true } si estás desarrollando
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
