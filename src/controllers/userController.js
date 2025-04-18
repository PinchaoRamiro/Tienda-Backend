const User = require('../models/userModel');

exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;
    const userLoged = req.user;

    if(userLoged.email != email){
        res.status(401).json({msg: 'Not authorized to select the id ', email});
        return;
    }

    try {
        const user = await User.findByPk(email, {
            attributes: { exclude: ['password'] }
        });
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error in the server', error });
    }
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const userLoged = req.user;

    if(userLoged.id != id){
        res.status(401).json({msg: 'Not authorized to select the id ', id});
        return;
    }

    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', err });
    }
};

exports.updateUserInfo = async (req, res) => {
    const { id } = req.params;
    const { name, lastname, typeDocument, numDocument, adress, phone } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        await user.update({ name, lastname, typeDocument, numDocument, adress, phone });
        res.json({ msg: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ msg: 'Error updating user', err });
    }
};

exports.updatePassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(403).json({ msg: 'Current password is incorrect' });

        const hashed = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashed });

        res.json({ msg: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', err });
    }
};

exports.toggleStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        await user.update({ status: !user.status });
        res.json({ msg: `User ${user.status ? 'activated' : 'deactivated'}` });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', err });
    }
};

