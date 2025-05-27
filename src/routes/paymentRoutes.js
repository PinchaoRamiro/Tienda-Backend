const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Protect routes if needed (e.g., verifyToken)
router.post('/', paymentController.createPayment);
router.patch('/:id', paymentController.updatePaymentStatus);
router.get('/order/:orderId', paymentController.getPaymentByOrder);

module.exports = router;
