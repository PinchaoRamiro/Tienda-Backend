const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.getUserByEmail = async (req, res) => {
	let { email } = req.params;
	const userLoged = req.user;

	if (req.user.role !== "admin") {
		if (!verifyReqIdAuth("getUserByEmail", userLoged.id, req, res)) return;;

		email = userLoged.email;
	}

	try {
		const user = await User.findOne({
			where: { email },
			attributes: { exclude: ['password'] }
		});

		if (!user) return res.status(404).json({ msg: 'User not found' });

		return res.status(200).json(user);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Server error', details: error });
	}
};

exports.getUserById = async (req, res) => {
	const { id } = req.params;

	if (req.user.role !== "admin") {
		if (!verifyReqIdAuth("getuserById", id, req, res)) return;
	}

	try {
		const user = await User.findByPk(id, {
			attributes: { exclude: ['password'] }
		});
		if (!user) return res.status(404).json({ msg: 'User not found' });
		res.status(200).json(
			{
				status: true,
				message: 'User found',
				data: user
			}
		);
	} catch (err) {
		res.status(500).json({ msg: 'Server error', err });
	}
};

exports.updateUserInfo = async (req, res) => {
	const { id } = req.params;
	const { name, lastname, email, typeDocument, numDocument, address, phone, status } = req.body;

	console.log("updateUserInfo", id, req.body);

	if (!verifyReqIdAuth("upadteUserInfo", id, req, res)) return;

	try {
		const user = await User.findByPk(id, {
			attributes: { exclude: ['password'] }
		});
		if (!user) return res.status(404).json({ msg: 'User not found' });

		// actualizar los datos del usuario
		await user.update({
			name,
			lastname,
			email,
			typeDocument,
			numDocument,
			address,
			phone,
			status
		});

		return res.status(200).json({ 
			status: true,
			message: 'User updated successfully',
			data: user
		 });
	} catch (err) {
		res.status(500).json({ msg: 'Error updating user', err });
	}
};

exports.updatePassword = async (req, res) => {
	const { id } = req.params;
	const { currentPassword, newPassword } = req.body;

	if (!currentPassword || !newPassword) {
		return res.status(400).json({
			msg: "Complete all fields"
		})
	}

	if (!verifyReqIdAuth("updatePassword", id, req, res)) return;

	try {
		const user = await User.findByPk(id);
		if (!user) return res.status(404).json({ msg: 'User not found' });

		const isMatch = await bcrypt.compare(currentPassword, user.password);
		if (!isMatch) return res.status(403).json({ msg: 'Current password is incorrect' });

		const hashed = await bcrypt.hash(newPassword, 10);
		await user.update({ password: hashed });

		res.json({ msg: 'Password updated successfully' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'Server error', err });
	}
};

exports.delete = async (req, res) => {
	const { id } = req.params;

	if (req.user.role !== "admin") {
		if (!verifyReqIdAuth("delete", id, req, res)) return;
	}

	try {
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ msg: "User Not Found" });
		}

		await user.destroy();
		return res.status(200).json({ msg: "User deleted" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ msg: "Server Error" });
	}
}

function verifyReqIdAuth(nameEndpoint, id, req, res) {
	if (id == null) {
		res.status(400).json({ msg: "Is necessary the id of the User" });
		return false;
	} else if (req.user.id != id) {
		res.status(401).json({ msg: `Not authorized to ${nameEndpoint} the user with id ${id}` });
		return false;
	}
	return true;
}
