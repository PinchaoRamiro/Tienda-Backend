const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { nombre, apellido, email, password, tipoDocumento, numeroDocumento, direccion, telefono } = req.body;
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ msg: 'El usuario ya existe' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            nombre, apellido, email, password: hashedPassword,
            tipoDocumento, numeroDocumento, direccion, telefono
        });

        res.status(201).json({ msg: 'Usuario registrado correctamente', user });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        if(!email || !password) return res.status(400).json({ msg: 'Por favor, complete todos los campos' });
        const user = await User.findOne({ where: { email } });
        console.log(user);

        if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { nombre: user.nombre, apellido: user.apellido, email: user.email } });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor', error });
        console.log(error);
    }
};
