const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');
const {logout} = require('../controllers/authController');

router.post('/register-admin', verifyToken, isAdmin, adminController.registerAdmin);
router.post('/logout', verifyToken, isAdmin, logout);
router.get('/users', verifyToken, isAdmin, adminController.getUsers );
router.get('/admins', verifyToken, isAdmin, adminController.getAdmins );
router.patch('/user-role/:id', verifyToken, isAdmin, adminController.updateRole);
router.delete('/user/:id', verifyToken, isAdmin, adminController.deleteUser);

module.exports = router;
