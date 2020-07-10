'use strict';

const orderService = require('../services/order');
const createOrderOnBling = require('../services/createOrder');
const pipedriveService = require('../services/pipedrive/deals');

// eslint-disable-next-line no-unused-vars
exports.all = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.send(orders);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// eslint-disable-next-line no-unused-vars
exports.findById = async (req, res) => {
  try {
    const orders = await orderService.getOrderById(req.params.id);
    res.send(orders);
  } catch (error) {
    res.status(404).send('Not found');
  }
};

exports.callbackUpdated = async (req, res) => {
  try {
    const {
      current: { status, id },
    } = req.body;
    if (status !== 'won') {
      return res.send();
    }

    const order = await orderService.getOrderByExternalId(id);
    if (order) {
      return res.send();
    }

    const { data: deal } = await pipedriveService.getDealById(id);
    await createOrderOnBling(deal);

    return res.send();
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

exports.getOrdersByDayTotal = async (req, res) => {
  try {
    const orders = await orderService.getOrdersDayTotal();
    res.send(orders);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
