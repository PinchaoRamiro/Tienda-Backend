const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin} = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/create', verifyToken, upload.single('image'), productController.createProduct);
router.get('/get/', productController.getAllProducts);
router.get('/get/:id', productController.getProductById);
router.put('/update/:id', verifyToken, isAdmin,  productController.updateProduct);
router.delete('/delete/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
