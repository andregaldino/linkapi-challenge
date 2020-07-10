'use strict';

const Order = require('../models/order');

const getOrdersByExternalIds = async (externalIds = []) =>
  Order.find({
    externalId: {
      $in: externalIds,
    },
  });

const save = async (order) => {
  const saved = await Order.create(order, (err) => {
    if (err) {
      throw err;
    }
  });
  return saved;
};

const getOrderByExternalId = async (externalId) =>
  Order.findOne({ externalId });

const getAllOrders = async () => Order.find();

const getOrderById = async (id) => Order.findOne({ id });

const getOrdersDayTotal = async () => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$wonAt' } },
        sum: { $sum: '$value' },
      },
    },
  ]);
  return orders.map((order) => {
    return {
      // eslint-disable-next-line no-underscore-dangle
      day: order._id,
      totalAmount: parseFloat(order.sum),
    };
  });
};

module.exports = {
  getOrdersDayTotal,
  getOrderByExternalId,
  getAllOrders,
  getOrderById,
  save,
  getOrdersByExternalIds,
};
