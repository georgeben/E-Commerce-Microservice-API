const { createContainer, asClass, asFunction, asValue } = require('awilix');
const ProductsService = require('../services/products.services');
const ProductController = require('../controllers/products.controller');
const db = require('../db');
const { DB_URL } = require('./index')();

const container = createContainer();

container.register({
  productsService: asClass(ProductsService).scoped(),
  productController: asClass(ProductController).scoped(),
  db: asFunction(db).singleton(),
  connectionString: asValue(DB_URL),
});

module.exports = container;
