'use strict';

const config = require('../config/database');
const mongoose = require('mongoose');

const databaseUrl = () => {
  const {
    mongo: { url, host, database, port },
  } = config;
  if (url) {
    return url;
  }

  return `mongodb://${host}:${port}/${database}`;
};

const connect = async () => {
  const {
    mongo: { user, password },
  } = config;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (user && password) {
    options.user = user;
    options.pass = password;
  }

  const db = await mongoose.connect(databaseUrl(), options);
  return db;
};

module.exports.connect = connect;
