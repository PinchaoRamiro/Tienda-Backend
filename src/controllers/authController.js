const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, lastname, email, password, typeDocument, numDocument, adress, phone } = req.body;
    console.log(req.body);
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ msg: 'User already exist' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, lastname, email, password: hashedPassword,
            typeDocument, numDocument, adress, phone
        });

        res.status(201).json({ msg: 'User register complety', user: { id: user.id, name: user.name, lastname: user.lastname, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Error in the server', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) return res.status(400).json({ error: 'Complete all fields' });
        const user = await User.findOne({ where: { email } });

        console.log(user);

        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

        res.json({ user: { id: user.id , name: user.name, lastname: user.lastname, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Error in the server', error });
    }
};
