'use strict';

const axios = require('axios').default;
const config = require('../config/integrations');

const {
  bling: { host, apikey },
} = config;
const versionApi = '/Api/v2';

const instance = axios.create({
  baseURL: host,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const createOrder = async (xml) =>
  instance.post(`${versionApi}/pedido/json/?apikey=${apikey}&xml=${xml}`);

exports.createOrder = createOrder;
