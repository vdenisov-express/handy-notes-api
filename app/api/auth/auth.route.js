const passport = require('passport');
const authRoute = require('express').Router();
const authController = require('./auth.controller');


authRoute.post('/login',
  authController.login
);

authRoute.post('/register',
  authController.register
);

authRoute.get('/testJWT',
  passport.authenticate('jwt', {session: false}),
  authController.testJWT
);


module.exports = authRoute;
