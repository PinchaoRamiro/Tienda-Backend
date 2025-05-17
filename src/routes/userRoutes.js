const express = require('express');
const userController= require('../controllers/userController');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { logout } = require('../controllers/authController');

router.get('/by-email/:email', verifyToken,  userController.getUserByEmail);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/update/:id', verifyToken, userController.updateUserInfo);
router.put('/password/:id', verifyToken, userController.updatePassword);
router.post('/logout', verifyToken, logout );

module.exports = router;
