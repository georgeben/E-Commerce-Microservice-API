/**
 * Parses the authorization header in requests and creates a req.user property
 * with details of the authenticated user
 */
const status = require('http-status');
const { makeInvoker } = require('awilix-express');

function createAuthMiddleware({ axios, USER_SERVICE_URL }) {
  return {
    authorized: async (req, res, next) => {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return res.status(status.UNAUTHORIZED).json({
          error: 'You are not authorized to perform this action, please login.',
        });
      }
      try {
        const requestToken = authorizationHeader.split('Bearer').pop().trim();

        // Send a request to user service to retrieve user info
        const response = await axios.get(`${USER_SERVICE_URL}/api/v1/users`, {
          headers: {
            authorization: `Bearer ${requestToken}`,
          },
        });
        const user = response.data.data;
        if (!user) {
          return res.status(status.UNAUTHORIZED).json({
            error: 'You cannot perform this action. Please login',
          });
        }
        req.user = user;
        return next();
      } catch (error) {
        if (error.response) {
          // The error is from user service
          return res.status(error.response.status).json(error.response.data);
        }
        return next(error);
      }
    },
  };
}

const authorizationMiddleware = makeInvoker(createAuthMiddleware);
module.exports = authorizationMiddleware;
