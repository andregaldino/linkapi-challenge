'use strict';

require('dotenv').config();

module.exports = {
  mongo: {
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 27017,
    database: process.env.DATABASE_DB || 'database',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
};
