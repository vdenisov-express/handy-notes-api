const authRoute = require('express').Router();
const authController = require('./auth.controller');

const mwCheckEmail = require('./../api-shared/middlewares/check-email');
const mwPassport = require('passport');


authRoute.post('/login', mwCheckEmail, authController.login);

authRoute.post('/register', mwCheckEmail, authController.register);

authRoute.get('/testJWT',
  mwPassport.authenticate('jwt', {session: false}),
  authController.testJWT
);


module.exports = authRoute;
