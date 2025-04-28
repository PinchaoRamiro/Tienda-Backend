const express = require('express');
const router = express.Router();
const adminReportController = require('../controllers/AdminReportController');
const { verifyToken , isAdmin} = require('../middleware/authMiddleware');

// Reportes
router.get('/dashboard', verifyToken, isAdmin,  adminReportController.getDashboardSummary);
router.get('/products/out-of-stock', verifyToken, isAdmin,  adminReportController.getOutOfStockProducts);
router.get('/orders/status', verifyToken, isAdmin,  adminReportController.getOrdersByStatus);

module.exports = router;
