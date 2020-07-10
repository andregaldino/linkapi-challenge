/* eslint-disable no-console */

'use strict';

const { getDeals } = require('../services/pipedriveDeals');
const { getOrdersByExternalIds } = require('../services/order');
const createOrderOnBling = require('../services/createOrder');
require('../services/connectDatabase').connect();

const options = {
  status: 'won',
  start: 0,
  limit: 500,
  sort: 'won_time DESC',
};

(async () => {
  const resultDeals = await getDeals(options);
  const { data } = resultDeals;

  const dealIds = data.map((deal) => deal.id);
  const orders = await getOrdersByExternalIds(dealIds);
  const orderIds = orders.map((order) => order.externalId);

  const dealsIdToIntegrate = data.filter((deal) => !orderIds.includes(deal.id));

  const allOrdersBling = dealsIdToIntegrate.map(async (deal) => {
    return createOrderOnBling(deal);
  });

  Promise.all(allOrdersBling)
    .then(() => {
      console.log('all deals created on bling erp');
    })
    .catch((er) => {
      console.log('error to create order on bling erp', er);
    });
})().catch((e) => {
  console.log(e);
});
