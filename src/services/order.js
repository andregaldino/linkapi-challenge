const Order = require('../models/order');

const getOrdersByExternalIds = async (externalIds = []) => {
  const orders = await Order.find({externalId: {
    $in: externalIds,
  }});

  return orders;
};

exports.getOrdersByExternalIds = getOrdersByExternalIds;

const save = async (order) => {
  Order.create(order, (err) => {
    if (err) {
      throw err
    }
  });
};

exports.save = save;
