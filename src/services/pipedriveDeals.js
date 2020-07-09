'use strict';
const lib = require('pipedrive');
const config = require('../config/integrations');
const {pipedrive: {token}} = config;
lib.Configuration.apiToken = token;

const getDeals = (options = {}) => lib.DealsController.getAllDeals(options);

exports.getDeals = getDeals;
