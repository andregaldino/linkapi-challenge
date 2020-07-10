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
