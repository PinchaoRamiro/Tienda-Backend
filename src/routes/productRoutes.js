const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin} = require('../middleware/authMiddleware');

router.get('/get/', productController.getAllProducts);
router.get('/get/:id', productController.getProductById);
router.post('/create', verifyToken, isAdmin,  productController.createProduct);
router.put('/update/:id', verifyToken, isAdmin,  productController.updateProduct);
router.delete('/delete/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
