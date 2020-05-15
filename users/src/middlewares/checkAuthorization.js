/**
 * Parses the authorization header in requests and creates a req.user property
 * with details of the authenticated user
 */
const status = require('http-status');
const { makeInvoker } = require('awilix-express');

function createAuthMiddleware({ userService, authHelper }) {
  return {
    authorized: async (req, res, next) => {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return res.status(status.UNAUTHORIZED).json({
          error: 'You are not authorized to access this resource, please login',
        });
      }
      try {
        const requestToken = authorizationHeader.split('Bearer').pop().trim();
        const decoded = await authHelper.decodeJWTToken(requestToken);
        const user = await userService.getUserById(decoded.id);
        if (!user) {
          return res.status(status.UNAUTHORIZED).json({
            error: 'Invalid token.',
          });
        }
        req.user = decoded;
        return next();
      } catch (error) {
        switch (error.name) {
          case 'JsonWebTokenError':
            return res.status(status.UNAUTHORIZED).json({
              error: 'Invalid authorization token supplied',
            });
          case 'TokenExpiredError':
            return res.status(status.UNAUTHORIZED).json({
              error: 'Your authentication token has expired. Please login',
            });
          default:
            return next(error);
        }
      }
    },
  };
}

const authorizationMiddleware = makeInvoker(createAuthMiddleware);
module.exports = authorizationMiddleware;
