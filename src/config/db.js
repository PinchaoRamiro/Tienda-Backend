const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error(' Error al conectar:', error);
    }
};

module.exports = { sequelize, connectDB };