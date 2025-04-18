const express = require('express');
const userController= require('../controllers/userController');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/by-email/:email', verifyToken,  userController.getUserByEmail);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/:id', verifyToken, userController.updateUserInfo);
router.put('/password/:id', verifyToken, userController.updatePassword);
router.patch('/status/:id', verifyToken, userController.toggleStatus);

module.exports = router;
