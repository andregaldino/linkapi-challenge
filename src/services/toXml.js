'use strict';

const xml2js = require('xml2js');
const utf8 = require('utf8');

const toXml = (object) => {
  const objectString = JSON.stringify(object);
  const encodedString = utf8.encode(objectString);
  const builder = new xml2js.Builder();
  return builder.buildObject(JSON.parse(encodedString));
};

module.exports = toXml;
