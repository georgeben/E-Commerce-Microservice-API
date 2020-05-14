const Joi = require('@hapi/joi');

const createProduct = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .required(),
  details: Joi.string()
    .trim()
    .min(20)
    .required(),
  categoryId: Joi.number()
    .required(),
  price: Joi.number()
    .positive()
    .required(),
  amountInStock: Joi.number()
    .positive()
    .required(),
  imageUrl: Joi.string().uri({
    scheme: [
      'http',
      'https',
    ],
  }).required(),
});


module.exports = {
  createProduct,
};
