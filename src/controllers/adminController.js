const {  User} = require('../models'); 
const { Op } = require('sequelize');
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
      success: true,
      mesage: 'Admin registered successfully',
      data: {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: 'Server error', err });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: "user"},
      attributes: { exclude: ['password'] }
    });
    res.status(200).json({
      success: true,
      data: users,
      message: 'Users fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ error: 'Error in the server', err });
  }
};

exports.searchAdmins = async (req, res) => {
  try {
    const search = (req.query.q || req.body.search || '').trim().replace(/^%|%$/g, '');

    if (!search) {
      return res.status(400).json({ msg: 'Search term is required' });
    }

    const users = await User.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { name: { [Op.iLike]: `%${search}%` } },
              { email: { [Op.iLike]: `%${search}%` } }
            ]
          },
          { role: 'admin' }
        ]
      },
      attributes: { exclude: ['password'] }
    });

    if (!users.length) {
      return res.status(404).json({ msg: 'No admin users found' });
    }

    return res.json({
      success: true,
      data: users,
      message: 'Admins found successfully'
    });
  } catch (err) {
    console.error('Error searching admins:', err);
    return res.status(500).json({ msg: 'Server Error', error: err });
  }
};

exports.searchUsers = async (req, res) => {
  const {q} = req.query;

  let search = q || req.body.search;

  if (!search || typeof search !== 'string') {
    return res.status(400).json({ msg: 'Pleace you need this' });
  }

    try {
      search = search.replace(/^%|%$/g, ''); // elimina % al principio y al final
  
      if (search.length === 0) {
        return res.status(400).json({ msg: 'This not be empty' });
      }
  
      const users = await User.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`
          },
          email: {
            [Op.iLike]: `%${search}%`
          },
          role: 'user'
        }
      });
  
      if (users.length === 0) {
        return res.status(404).json({ msg: 'Not found' });
      }
  
      return res.json({
        success: true,
        data: users,
        message: 'Users find successfully'
      });
    } catch (err) {
      console.error(err);
      console.log('Error searching users:', err);
      return res.status(500).json({ msg: 'Server Error', error: err });
    }
}

exports.getAdmins = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: "admin"},
      attributes: { exclude: ['password'] }
    });

    // remove admin logged in from the list of admins
    const adminLogged = req.user.id;
    const filteredUsers = users.filter(user => user.id !== adminLogged);

    res.status(200).json({
      success: true,
      data: filteredUsers,
      message: 'Admins fetched successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error in the server', err });
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
    res.json({ 
      success: true,
      data: user,
      message: 'User role updated successfully'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    await user.destroy();
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  }
  catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
}



