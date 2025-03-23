const express = require('express');
const { getUsers, getUser, updateUser, updateStatus } = require('../controllers/userController');
const router = express.Router();

router.get('/users', getUsers);
router.get('/user/:email', getUser);
router.put('/user/update/:id', updateUser);
router.put('/user/status/:id', updateStatus);

module.exports = router;
