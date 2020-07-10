'use strict';

const Order = require('../models/order');

const getOrdersByExternalIds = async (externalIds = []) => {
  const orders = await Order.find({
    externalId: {
      $in: externalIds,
    },
  });

  return orders;
};

exports.getOrdersByExternalIds = getOrdersByExternalIds;

const save = async (order) => {
  const saved = await Order.create(order, (err) => {
    if (err) {
      throw err;
    }
  });
  return saved;
};

exports.save = save;

const getOrderByExternalId = async (externalId) => {
  const order = await Order.findOne({ externalId });
  return order;
};

exports.getOrderByExternalId = getOrderByExternalId;

const getAllOrders = async () => {
  const orders = await Order.find();
  return orders;
};

exports.getAllOrders = getAllOrders;

const getOrderById = async (id) => {
  const order = await Order.findOne({ id });
  return order;
};

exports.getOrderById = getOrderById;

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

exports.getOrdersDayTotal = getOrdersDayTotal;
