const { Router } = require('express');
const validator = require('../../middlewares/validator');
const checkAuth = require('../../middlewares/checkAuthorization');
const usersController = require('../../controllers/user.controller');
const cartController = require('../../controllers/cart.controller');
const { createUser, signIn } = require('../../schema/user.schema');
const { addToCart } = require('../../schema/cart.schema');

const router = Router();

router.get('/', (req, res) => {
  const message = 'E-Commerce Users service';
  return res.status(200).json({
    message,
  });
});

router.get('/users', checkAuth('authorized'), usersController('getUser'));
router.post('/users/signup', validator(createUser, 'body'), usersController('signup'));
router.post('/users/login', validator(signIn, 'body'), usersController('login'));
router.post(
  '/users/cart',
  validator(addToCart, 'body'),
  checkAuth('authorized'),
  cartController('addToCart'),
);
router.get('/users/cart', checkAuth('authorized'), cartController('getCart'));

module.exports = router;
