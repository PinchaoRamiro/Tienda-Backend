const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/create', verifyToken, orderController.createOrder);
router.get('/', verifyToken, orderController.getMyOrders); 
router.get('/all', verifyToken, isAdmin,  orderController.getAllOrders); 
router.get('/:id', verifyToken, orderController.getOrderById);
router.get('/user/:userId', verifyToken, isAdmin, orderController.getOrdersByUserId);
router.patch('/:id/status', verifyToken, isAdmin,  orderController.updateOrderStatus);

module.exports = router;
