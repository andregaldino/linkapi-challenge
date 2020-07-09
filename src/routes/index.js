const express = require('express');
const router = new express.Router();
const orderController = require('../controllers/orderController');

router.get('/order', orderController.all);
router.get('/order/:id', orderController.findById);

module.exports = router;
