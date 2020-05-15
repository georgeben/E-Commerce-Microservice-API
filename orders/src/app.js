const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const status = require('http-status');
const { scopePerRequest } = require('awilix-express');

const api = require('./routes');
const errorHandler = require('./util/errorHandler');
const container = require('./config/di');
const { LOG_FORMAT } = require('./config')();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan(LOG_FORMAT));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(scopePerRequest(container));

app.use('/api', api);


app.use((req, res, next) => {
  return res.status(status.NOT_FOUND).json({
    error: 'The resource you are requesting for does not exist',
  });
});


app.use(errorHandler);

module.exports = app;
