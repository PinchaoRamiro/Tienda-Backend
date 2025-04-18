const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.registerAdmin = async (req, res) => {
    const { name, lastname, email, password } = req.body;

    try {
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(409).json({ msg: 'Admin already exists' });

        const hashed = await bcrypt.hash(password, 10);
        const newAdmin = await User.create({
            name, lastname, email,
            password: hashed,
            role: 'admin'
        });

        return res.status(201).json({
            msg: 'Admin registered successfully',
            admin: {
                id: newAdmin.id,
                name: newAdmin.name,
                email: newAdmin.email
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error', err });
    }
};

exports.getUsers = async (res) => {
  try {
      const users = await User.findAll();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: 'Error in the server', error });
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ msg: 'Invalid role' });
  }

  try {
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ msg: 'User not found' });

      await user.update({ role });
      res.json({ msg: `User role updated to ${role}` });
  } catch (err) {
      res.status(500).json({ msg: 'Server error', err });
  }
};
