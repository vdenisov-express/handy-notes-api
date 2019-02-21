const authRoute = require('express').Router();
const authController = require('./auth.controller');


authRoute.post('/login', authController.login);

authRoute.post('/register', authController.register);


module.exports = authRoute;
