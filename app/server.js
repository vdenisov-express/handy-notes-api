// libs {
const express = require('express');
const bodyParser = require('body-parser');

const initSiteFor = require('./site/init');
// } libs

const { apiV1 } = require('./api/v1.route');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger.json');

initSiteFor(app);

// API v1 {
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }) );

app.use('/api-v1', apiV1);
app.use('/api-v1-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// } API v1

app.use('**', (req, res) => {
  res.status(404).send('404 - Not Found :(');
});

// export {
module.exports = app;
// } export
