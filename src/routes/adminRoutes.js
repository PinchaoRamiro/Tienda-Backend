const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.post('/register-admin', verifyToken, isAdmin, adminController.registerAdmin);
router.get('/users', verifyToken, isAdmin, adminController.getUsers );
router.patch('/user-role/:id', verifyToken, isAdmin, adminController.updateRole);

module.exports = router;
