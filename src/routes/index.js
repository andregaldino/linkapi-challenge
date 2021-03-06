'use strict';

const express = require('express');
const router = new express.Router();
const orderController = require('../controllers/orderController');

router.get('/order', orderController.all);
router.get('/order/:id', orderController.findById);
router.post('/order/updated', orderController.callbackUpdated);
router.get('/order-aggregated', orderController.getOrdersByDayTotal);

module.exports = router;
