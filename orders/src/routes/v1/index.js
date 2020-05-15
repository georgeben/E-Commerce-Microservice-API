const { Router } = require('express');
const validator = require('../../middlewares/validator');
const checkAuth = require('../../middlewares/validateUser');
const ordersController = require('../../controllers/orders.controller');
const { makeOrder } = require('../../schema/orders.schema');

const router = Router();

router.get('/', (req, res) => {
  const message = 'E-Commerce Orders service';
  return res.status(200).json({
    message,
  });
});

router.post('/orders', validator(makeOrder), checkAuth('authorized'), ordersController('makeOrder'));


module.exports = router;
