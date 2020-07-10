const { getOrderByExternalId } = require('../services/order')
const createOrderOnBling = require('../services/createOrder')
const {getDealById} = require('../services/pipedriveDeals');

exports.all = (req, res) => {

};

exports.findById = (req, res) => {

};

exports.callbackUpdated = async (req, res) => {
  const { current: {
    status,
    id
  }, previous } = req.body;
  if (status !== 'won') {
    return res.send()
  }

  const order = await getOrderByExternalId(id);
  if (order) {
    return res.send()
  }

  const {data: deal} = await getDealById(id)
  const created = await createOrderOnBling(deal);

  return res.send()
};
