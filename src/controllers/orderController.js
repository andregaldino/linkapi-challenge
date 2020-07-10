'use strict';

const {
  getOrderByExternalId,
  getAllOrders,
  getOrderById,
  getOrdersDayTotal,
} = require('../services/order');
const createOrderOnBling = require('../services/createOrder');
const { getDealById } = require('../services/pipedriveDeals');

// eslint-disable-next-line no-unused-vars
exports.all = async (req, res) => {
  const orders = await getAllOrders();
  return res.send(orders);
};

// eslint-disable-next-line no-unused-vars
exports.findById = async (req, res) => {
  const orders = await getOrderById(req.id);
  return res.send(orders);
};

exports.callbackUpdated = async (req, res) => {
  const {
    current: { status, id },
  } = req.body;
  if (status !== 'won') {
    return res.send();
  }

  const order = await getOrderByExternalId(id);
  if (order) {
    return res.send();
  }

  const { data: deal } = await getDealById(id);
  await createOrderOnBling(deal);

  return res.send();
};

exports.getOrdersByDayTotal = async (req, res) => {
  const orders = await getOrdersDayTotal();
  return res.send(orders);
};
