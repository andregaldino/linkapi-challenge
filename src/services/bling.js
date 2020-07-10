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

const createOrder = async (xml) => {
  const { data } = await instance.post(
    `${versionApi}/pedido/json/?apikey=${apikey}&xml=${xml}`,
  );

  if (data.retorno.erros) {
    const msg = JSON.stringify(data.retorno.erros);
    throw new Error(`Bling integration falied: ${msg}`);
  }

  return data.retorno;
};

exports.createOrder = createOrder;
