const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/get/', categoryController.getAllCategories);
router.get('/get/:id', categoryController.getCategoryById);
router.post('/create/', verifyToken, isAdmin,  categoryController.createCategory);
router.put('/update/:id', verifyToken, isAdmin,  categoryController.updateCategory);
router.delete('/delete/:id', verifyToken, isAdmin, categoryController.deleteCategory);

module.exports = router;
