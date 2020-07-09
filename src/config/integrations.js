require('dotenv').config();

module.exports = {
  pipedrive: {
    token: process.env.PIPEDRIVE_TOKEN,
  },
  bling: {
    apiKey: process.env.BLING_API_KEY,
  },
};
