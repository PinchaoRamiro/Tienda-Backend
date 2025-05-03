const { DataTypes } = require('sequelize');
//const { sequelize } = require('../config/db');
const { sequelize } = require('../config/db_remote'); // Cambia esto si usas una base de datos diferente

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'categories',
      key: 'category_id'
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'products',
  createdAt: 'created_at',
  updatedAt: false
});

Product.associate = (models) => {
  Product.belongsTo(models.Category, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });
};

Product.associate = (models) => {
  Product.hasMany(models.OrderItem, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
}

  Product.associate = (models) => {
    Product.hasMany(models.ProductAttribute, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }

module.exports = Product;
