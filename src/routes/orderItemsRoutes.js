const express = require('express');
const router = express.Router();
const orderItemsController = require('../controllers/orderItemsController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/create', verifyToken, orderItemsController.createOrderItem);
router.get('/get/:order_id', verifyToken, orderItemsController.getOrderItems);
router.put('/update/:order_item_id', verifyToken, orderItemsController.updateOrderItem);
router.delete('/delete/:order_item_id', verifyToken, orderItemsController.deleteOrderItem);

module.exports = router;
