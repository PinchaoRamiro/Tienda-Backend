const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor', error });
    }
};
