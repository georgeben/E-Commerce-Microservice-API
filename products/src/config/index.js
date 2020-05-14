require('dotenv').config();

/**
 * Exports environment specific configuration for app
 */

module.exports = function () {
  const { NODE_ENV } = process.env;
  switch (NODE_ENV) {
    case 'production':
      return {
        DB_URL: process.env.PROD_DB,
        LOG_FORMAT: 'combined',
      };
    case 'test':
      return {
        DB_URL: process.env.TEST_DB,
        LOG_FORMAT: 'combined',
      };
    default:
      return {
        DB_URL: process.env.DEV_DB,
        LOG_FORMAT: 'dev',
      };
  }
};
