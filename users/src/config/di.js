const { createContainer, asClass, asFunction, asValue } = require('awilix');
const axios = require('axios');
const UserService = require('../services/users.services');
const UserController = require('../controllers/user.controller');
const CartService = require('../services/cart.services');
const CartController = require('../controllers/cart.controller');
const authHelper = require('../util/authHelper');
const db = require('../db');
const { DB_URL } = require('./index')();

const container = createContainer();

container.register({
  userService: asClass(UserService).scoped(),
  userController: asClass(UserController).scoped(),
  cartService: asClass(CartService).scoped(),
  cartController: asClass(CartController).scoped(),
  db: asFunction(db).singleton(),
  connectionString: asValue(DB_URL),
  authHelper: asValue(authHelper),
  axios: asValue(axios),
  PRODUCT_SERVICE_URL: asValue(process.env.PRODUCT_SERVICE_URL),
});

module.exports = container;
