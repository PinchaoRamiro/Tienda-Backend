// config/db_remote.js
const { Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();


// Usa la URL completa de Supabase (o la que tengas en una variable de entorno)
const sequelize = new Sequelize(process.env.DB_RM_URL, {
  dialect: 'postgres',
  dialectOptions: { ssl: { rejectUnauthorized: false } },
  logging: false,
});

// Función para probar la conexión (opcional)
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la DB remota');
  } catch (err) {
    console.error('❌ No se pudo conectar:', err);
    process.exit(1);
  }
};

module.exports = { sequelize, DataTypes, connectDB };
