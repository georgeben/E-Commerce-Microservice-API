const status = require('http-status');
const { makeInvoker } = require('awilix-express');

function createUserController({ userService, authHelper }) {
  return {
    signup: async (req, res, next) => {
      const {
        firstName,
        lastName,
        email,
        password,
        phoneNo,
      } = req.body;
      try {
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
          return res.status(status.CONFLICT).json({
            error: 'A user with this email already exists.',
          });
        }
        const hashedPassword = await authHelper.generatePasswordHash(password);
        const createdUser = await userService.createUser(
          firstName, lastName, email, hashedPassword, phoneNo,
        );
        return res.status(status.CREATED).json({
          message: 'Successfully created user',
          data: createdUser,
        });
      } catch (error) {
        return next(error);
      }
    },
    login: async (req, res, next) => {
      const { email, password } = req.body;
      try {
        const existingUser = await userService.getUserByEmail(email);
        if (!existingUser) {
          return res.status(status.UNAUTHORIZED).json({
            error: 'Invalid email/password',
          });
        }
        const passwordMatch = await authHelper.comparePassword(password, existingUser.password);
        if (!passwordMatch) {
          return res.status(status.UNAUTHORIZED).json({
            error: 'Invalid email/password',
          });
        }
        const token = authHelper.signJWTToken({ id: existingUser.id, email });
        const { password: pass, ...user } = existingUser;
        return res.status(status.OK).json({
          message: 'Log in successful',
          data: {
            user,
            token,
          },
        });
      } catch (error) {
        return next(error);
      }
    },
    getUser: async (req, res, next) => {
      const { email } = req.user;
      try {
        const response = await userService.getUserByEmail(email);
        const { password, ...user } = response;
        return res.status(status.OK).json({
          message: 'Successfully fetched user data',
          data: user,
        });
      } catch (error) {
        return next(error);
      }
    },
  };
}

const userController = makeInvoker(createUserController);
module.exports = userController;
