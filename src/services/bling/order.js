'use strict';

const bling = require('./bling');
const config = require('../../config/integrations');

const {
  bling: { apikey },
} = config;
const versionApi = '/Api/v2';

const create = async (xml) => {
  const { data } = await bling.post(
    `${versionApi}/pedido/json/?apikey=${apikey}&xml=${xml}`,
  );

  if (data.retorno.erros) {
    const msg = JSON.stringify(data.retorno.erros);
    throw new Error(`Bling integration falied: ${msg}`);
  }

  return data.retorno;
};

module.exports = { create };
