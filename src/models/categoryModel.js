const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categories',
  timestamps: false
});

Category.associate = (models) => {
  Category.hasMany(models.Product, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });
};




module.exports = Category;
