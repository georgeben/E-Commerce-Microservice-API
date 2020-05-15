const { createContainer, asClass, asFunction, asValue } = require('awilix');
const UserService = require('../services/users.services');
const UserController = require('../controllers/user.controller');
const authHelper = require('../util/authHelper');
const db = require('../db');
const { DB_URL } = require('./index')();

const container = createContainer();

container.register({
  userService: asClass(UserService).scoped(),
  userController: asClass(UserController).scoped(),
  db: asFunction(db).singleton(),
  connectionString: asValue(DB_URL),
  authHelper: asValue(authHelper),
});

module.exports = container;
