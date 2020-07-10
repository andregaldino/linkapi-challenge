'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    status: {
      type: String,
    },
    externalId: {
      type: Number,
    },
    orderId: {
      type: String,
    },
    wonAt: {
      type: Date,
    },
    value: {
      type: mongoose.Decimal128,
    },
  },
  { timestamps: true },
  {
    collection: 'orders',
  },
);

module.exports = mongoose.model('Order', orderSchema);
