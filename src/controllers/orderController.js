'use strict';

const orderService = require('../services/order');
const createOrderOnBling = require('../services/createOrder');
const pipedriveService = require('../services/pipedrive/deals');

// eslint-disable-next-line no-unused-vars
exports.all = async (req, res) => {
  const orders = await orderService.getAllOrders();
  return res.send(orders);
};

// eslint-disable-next-line no-unused-vars
exports.findById = async (req, res) => {
  const orders = await orderService.getOrderById(req.id);
  return res.send(orders);
};

exports.callbackUpdated = async (req, res) => {
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
};

exports.getOrdersByDayTotal = async (req, res) => {
  const orders = await orderService.getOrdersDayTotal();
  return res.send(orders);
};
