const {createOrder} = require('./bling')
const transformerOrder = require('../transformers/bling/transformerOrder')
const toXml = require('./toXml');
const {getDealWithProduct} = require('./pipedriveDeals');
const {save} = require('../services/order');

const createOrderOnBling = async (deal) => {

  const productsDeal = await getDealWithProduct({
    id: deal.id,
    includeProductData: 1
  });
  dealDetails = {
      ...deal,
      items: productsDeal.data
  }
  const orderTransformer =  transformerOrder(dealDetails);
  const orderXml = toXml(orderTransformer);
  const result = await createOrder(orderXml);
  const resultDb = await save({
    status: deal.status,
    externalId: deal.id
  });

  return resultDb
}

module.exports = createOrderOnBling
