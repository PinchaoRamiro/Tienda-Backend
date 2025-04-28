const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin} = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/create', verifyToken, upload.single('image'), productController.createProduct);
router.get('/search', verifyToken,  productController.searchProducts);
router.get('/get/', verifyToken, productController.getAllProducts);

router.get('/get/:id', verifyToken,  productController.getProductById);
router.put('/update/:id', verifyToken, isAdmin,  productController.updateProduct);
router.delete('/delete/:id', verifyToken, isAdmin, productController.deleteProduct);
router.get('/get/category/:categoryId', verifyToken,  productController.getProductsByCategory);
router.get('/get/price/:minPrice/:maxPrice', verifyToken,  productController.getProductsByPriceRange);

module.exports = router;
