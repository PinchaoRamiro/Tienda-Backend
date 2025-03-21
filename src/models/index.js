const { sequelize, connectDB } = require('../config/db');
const User = require('./userModel');

const syncDB = async () => {
    await sequelize.sync({ alter: true });
};

module.exports = { connectDB, syncDB, User };
