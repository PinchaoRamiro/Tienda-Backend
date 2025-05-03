const express = require('express');
const router = express.Router();
const { createAttribute, getAttributesByCategory, getAllAttributes } = require('../controllers/attributeController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, isAdmin, createAttribute);
router.get('/category/:category_id', verifyToken, getAttributesByCategory);
router.get('/', verifyToken, getAllAttributes);

module.exports = router;
