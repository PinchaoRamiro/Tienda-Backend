const User = require('../models/userModel');

exports.getUsers = async (res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', error });
    }
};

exports.getUser = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', error });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastname, email, typeDocument, numDocument, adress, phone } = req.body;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.typeDocument = typeDocument;
        user.numDocument = numDocument;
        user.adress = adress;
        user.phone = phone;

        await user.save();

        res.json({ msg: 'User updated', user });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', error });
    }
}

exports.updateStatus = async (req, res) => {    
    const { id } = req.params;
    const { status } = req.body;
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.status = status;

        await user.save();

        res.json({ msg: 'Status updated', user });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor', error });
    }
}
