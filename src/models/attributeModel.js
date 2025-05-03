const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Attribute = sequelize.define('Attribute', {
    attribute_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'attributes',
    timestamps: false
  });

  Attribute.associate = (models) => {
    Attribute.belongsTo(models.Category, {
      foreignKey: 'category_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  module.exports = Attribute;