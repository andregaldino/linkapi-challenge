'use strict';

const orderBling = require('./bling/order');
const transformerOrder = require('../transformers/bling/transformerOrder');
const toXml = require('./toXml');
const { getDealWithProduct } = require('./pipedrive/deals');
const { save } = require('../services/order');

const createOrderOnBling = async (deal) => {
  const productsDeal = await getDealWithProduct({
    id: deal.id,
    includeProductData: 1,
  });
  const dealDetails = {
    ...deal,
    items: productsDeal.data,
  };
  const orderTransformer = transformerOrder(dealDetails);
  const orderXml = toXml(orderTransformer);
  const { pedidos } = await orderBling.create(orderXml);
  const { pedido } = pedidos[0];

  const resultDb = await save({
    status: deal.status,
    externalId: deal.id,
    orderId: pedido.idPedido,
    wonAt: deal.won_time,
    value: deal.value,
  });
  return resultDb;
};

module.exports = createOrderOnBling;
