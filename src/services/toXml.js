'use strict';

const xml2js = require('xml2js');

const toXml = (object) => {
  const builder = new xml2js.Builder();
  return builder.buildObject(object);
};

module.exports = toXml;
