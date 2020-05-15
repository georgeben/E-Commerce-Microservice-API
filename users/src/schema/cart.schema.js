const Joi = require('@hapi/joi');

const addToCart = Joi.object({
  saveForLater: Joi.boolean(),
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().required(),
});

const checkForId = Joi.object({
  id: Joi.number().integer().required(),
});

module.exports = {
  addToCart,
  checkForId,
};
