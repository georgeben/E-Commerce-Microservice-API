const Joi = require('@hapi/joi');

const emailValidation = Joi.string()
  .trim()
  .email({ minDomainSegments: 2 })
  .required();
const passwordValidation = Joi.string()
  .trim()
  .min(4)
  .required();

const createUser = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .required(),
  lastName: Joi.string()
    .trim()
    .min(2)
    .required(),
  email: emailValidation,
  password: passwordValidation,
  phoneNo: Joi.string()
    .trim()
    .length(11)
    .required(),
  /* sex: Joi.string()
    .trim()
    .valid('M', 'F')
    .required(), */
  /* address: Joi.object({
    address: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    state: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
    zipcode: Joi.string().trim().required(),
  }).optional(), */
});

const signIn = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});

module.exports = {
  createUser,
  signIn,
};
