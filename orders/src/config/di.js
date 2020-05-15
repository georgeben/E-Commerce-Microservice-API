const {
  createContainer, asClass, asFunction, asValue,
} = require('awilix');
const axios = require('axios');
const OrdersService = require('../services/orders.services');
const OrdersController = require('../controllers/orders.controller');
const db = require('../db');
const { DB_URL } = require('./index')();

const container = createContainer();

container.register({
  ordersService: asClass(OrdersService).scoped(),
  ordersController: asClass(OrdersController).scoped(),
  db: asFunction(db).singleton(),
  connectionString: asValue(DB_URL),
  axios: asValue(axios),
  USER_SERVICE_URL: asValue(process.env.USER_SERVICE_URL),
  PRODUCT_SERVICE_URL: asValue(process.env.PRODUCT_SERVICE_URL),
});

module.exports = container;
