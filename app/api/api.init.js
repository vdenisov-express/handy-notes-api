// API {
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const helmet = require('helmet');

const { apiV1 } = require('./api.route');
// } API

// AUTH {
const passport = require('passport');
const authMiddleware = require('./auth/auth.middleware');
// } AUTH

module.exports = function initialize (app) {
  // API: config {
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // } API: config

  // AUTH: config {
  app.use(passport.initialize());
  authMiddleware.useJWT(passport);
  // } AUTH: config

  // API: routes {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/api/v1', apiV1);
  // } API: routes

  console.log('* app => server API initialized');
};
