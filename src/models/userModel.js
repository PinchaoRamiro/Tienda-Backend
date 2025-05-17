const { sequelize, DataTypes } = require('../config/db');
// const { sequelize, DataTypes } = require('../config/db_remote'); // Cambia esto si usas una base de datos diferente

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: { type: DataTypes.STRING, allowNull: false },
    typeDocument: { type: DataTypes.STRING, allowNull: true },
    numDocument: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user' 
    }
    
}, {
    timestamps: true,
});

User.associate = (models) => {
    User.hasMany(models.Order, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

User.associate = (models) => {
    User.hasMany(models.Order, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};



module.exports = User;
