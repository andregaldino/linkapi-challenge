const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverConfig = require('./config/server');
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const {port} = serverConfig;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
