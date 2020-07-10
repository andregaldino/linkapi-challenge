'use strict';
const lib = require('pipedrive');
const config = require('../config/integrations');
const {pipedrive: {token}} = config;
lib.Configuration.apiToken = token;

const getDeals = (options = {}) => lib.DealsController.getAllDeals(options);

exports.getDeals = getDeals;

const getDealWithProduct = (options) => lib.DealsController.listProductsAttachedToADeal(options);

exports.getDealWithProduct = getDealWithProduct;

const getDealById = (id) => lib.DealsController.getDetailsOfADeal(id);

exports.getDealById = getDealById;
