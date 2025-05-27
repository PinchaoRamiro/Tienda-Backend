const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/authMiddleware');

// Protect routes if needed (e.g., verifyToken)
router.post('/', verifyToken, paymentController.createPayment);
router.patch('/:id', verifyToken, paymentController.updatePaymentStatus);
router.get('/order/:orderId', verifyToken, paymentController.getPaymentByOrder);

module.exports = router;
