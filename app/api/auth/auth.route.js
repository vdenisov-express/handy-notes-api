const authRoute = require('express').Router();
const authController = require('./auth.controller');

const mwCheckEmail = require('./../api-shared/middlewares/check-email');


authRoute.post('/login', mwCheckEmail, authController.login);

authRoute.post('/register', mwCheckEmail, authController.register);


module.exports = authRoute;
