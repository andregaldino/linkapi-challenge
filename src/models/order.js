const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  status: {
    type: String,
  },
  externalId: {
    type: Number,
  },
}, {
  collection: 'orders',
});

const modelOrder = mongoose.model('Order', orderSchema);
module.exports = modelOrder;
