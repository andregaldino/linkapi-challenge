'use strict';

const lib = require('pipedrive');
const config = require('../../config/integrations');
const {
  pipedrive: { token },
} = config;
lib.Configuration.apiToken = token;

module.exports = lib;
