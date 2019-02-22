// API {
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { apiV1 } = require('./v1.route');
// } API

// AUTH {
const passport = require('passport');
// } AUTH


module.exports = function initialize(app) {

  // API: config {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }) );
  // } API: config

  // AUTH: config {
  app.use(passport.initialize());
  require('./api-shared/middlewares/auth-jwt')(passport);
  // } AUTH: config

  // API: routes {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/api/v1', apiV1);

  app.use('**', (req, res) => {
    res.status(404).send('404 - Not Found :(');
  });
  // } API: routes

}
