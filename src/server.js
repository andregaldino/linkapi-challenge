'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverConfig = require('./config/server');
const routes = require('./routes');
require('./services/connectDatabase').connect();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1', routes);
const { port } = serverConfig;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}.`);
});
