const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ProductAttribute = sequelize.define('ProductAttribute', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'product_attributes',
    timestamps: false
  });

  ProductAttribute.associate = (models) => {
    ProductAttribute.belongsTo(models.Product, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    ProductAttribute.belongsTo(models.Attribute, {
      foreignKey: 'attribute_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

module.exports = ProductAttribute;
