'use strict';

const axios = require('axios').default;
const config = require('../../config/integrations');

const {
  bling: { host },
} = config;

const instance = axios.create({
  baseURL: host,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

module.exports = instance;
