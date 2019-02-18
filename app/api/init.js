const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { apiV1 } = require('./v1.route');


module.exports = function initialize(app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }) );

  app.use('/api-v1', apiV1);
  app.use('/api-v1-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use('**', (req, res) => {
    res.status(404).send('404 - Not Found :(');
  });
  
}
