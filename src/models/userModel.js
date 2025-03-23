const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    typeDocument: { type: DataTypes.STRING, allowNull: false },
    numDocument: { type: DataTypes.STRING, allowNull: false },
    adress: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    password: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: true,
});

module.exports = User;
