const { Router } = require('express');
const productsController = require('../../controllers/products.controller');
const validator = require('../../middlewares/validator');
const { createProduct } = require('../../schema/product.schema');

const router = Router();

router.get('/', (req, res) => {
  const message = 'Welcome to E-Commerce API';
  return res.status(200).json({
    message,
  });
});

router.get('/products', productsController('getAllProducts'));
router.get('/products/:id', productsController('getProduct'));
router.post('/products', validator(createProduct, 'body'), productsController('createProduct'));

module.exports = router;
