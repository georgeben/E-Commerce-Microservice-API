const Joi = require('@hapi/joi');

const orderItems = Joi.object({
  id: Joi.number().integer().required(),
  quantity: Joi.number().integer().required(),
});

const makeOrder = Joi.object({
  shippingAddress: Joi.object({
    address: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    state: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
    zipcode: Joi.string().trim(),
  }).required(),
  products: Joi.array().items(orderItems).min(1).required(),
});

const cancelOrder = Joi.object({
  orderId: Joi.number().integer().required(),
});

module.exports = {
  makeOrder,
  cancelOrder,
};
