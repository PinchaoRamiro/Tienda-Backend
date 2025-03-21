const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    tipoDocumento: { type: DataTypes.STRING, allowNull: false },
    numeroDocumento: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    password: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: true,
});

module.exports = User;
