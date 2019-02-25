const passport = require('passport');
const authRoute = require('express').Router();
const authController = require('./auth.controller');

const usersMiddleware = require('./../users/middleware');


authRoute.post('/login',
  usersMiddleware.checkEmail,
  authController.login
);

authRoute.post('/register',
  usersMiddleware.checkEmail,
  authController.register
);

authRoute.get('/testJWT',
  passport.authenticate('jwt', {session: false}),
  authController.testJWT
);


module.exports = authRoute;
