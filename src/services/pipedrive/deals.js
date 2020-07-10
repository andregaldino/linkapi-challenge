'use strict';

const lib = require('./pipedrive');
const getDeals = (options = {}) => lib.DealsController.getAllDeals(options);

const getDealWithProduct = (options) =>
  lib.DealsController.listProductsAttachedToADeal(options);

const getDealById = (id) => lib.DealsController.getDetailsOfADeal(id);

module.exports = { getDealById, getDeals, getDealWithProduct };
