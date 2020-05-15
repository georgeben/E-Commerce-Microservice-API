const status = require('http-status');
/**
 * Validates incoming requests
 * @param {Object} schema - The Joi schema to validate request against
 * @param {Object} property - The property of the request to check e.g body, params, query
 */
function validate(schema, property = 'body') {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { allowUnknown: true });
    if (error === undefined) {
      return next();
    }
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    return res.status(status.BAD_REQUEST).json({
      error: message,
    });
  };
}

module.exports = validate;
