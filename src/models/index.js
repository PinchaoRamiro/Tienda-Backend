const { sequelize, connectDB } = require('../config/db');

// Modelos
const User = require('./userModel');
const Product = require('./productModel');
const Category = require('./categoryModel');
const Order = require('./orderModel');
const OrderItem = require('./orderItemModel');
const ProductAttribute = require('./productAttributeModel');
const Attribute = require('./attributeModel');
const Payment = require('./paymentModel');

// Relaciones

// Producto tiene muchos atributos
Attribute.belongsTo(Category, {
   foreignKey: 'category_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

Category.hasMany(Attribute, {
   foreignKey: 'category_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

Product.hasMany(ProductAttribute, {
   foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'

});

ProductAttribute.belongsTo(Attribute, {
   foreignKey: 'attribute_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
   });


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

// Payment Model
// Order hasOne Payment
Order.hasOne(Payment, {
  foreignKey: 'order_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Payment belongsTo Order
Payment.belongsTo(Order, {
  foreignKey: 'order_id',
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
  OrderItem,
  ProductAttribute,
  Attribute,
  Payment
};

