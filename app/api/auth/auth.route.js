const passport = require('passport');
const authRoute = require('express').Router();

const authMiddleware = require('./auth.middleware');
const authController = require('./auth.controller');

authRoute.post('/login',
  authMiddleware.validateLogin,
  authController.login
);

authRoute.post('/register',
  authMiddleware.validateRegister,
  authController.register
);

authRoute.get('/testJWT',
  passport.authenticate('jwt', { session: false }),
  authController.testJWT
);

module.exports = { authRoute };
