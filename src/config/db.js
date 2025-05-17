const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER_NAME, 
    process.env.DB_PASSWORD,
    {
      host: 'localhost', 
      dialect: 'postgres', 
      port: process.env.DB_PORT, 
    }
  );

const connectDB = async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error(' Error to connect:', error);
    }
};

module.exports = { sequelize, DataTypes,  connectDB };