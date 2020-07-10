'use strict';

const { getOrderByExternalId } = require('../services/order');
const createOrderOnBling = require('../services/createOrder');
const { getDealById } = require('../services/pipedriveDeals');

// eslint-disable-next-line no-unused-vars
exports.all = (req, res) => {};

// eslint-disable-next-line no-unused-vars
exports.findById = (req, res) => {};

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
