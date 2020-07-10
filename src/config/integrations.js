'use strict';

require('dotenv').config();

module.exports = {
  pipedrive: {
    token: process.env.PIPEDRIVE_TOKEN,
  },
  bling: {
    host: 'https://bling.com.br',
    apikey: process.env.BLING_API_KEY,
  },
};
