// libs {
const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const exphbs  = require('express-handlebars');
// } libs

const { apiV1 } = require('./api/v1.route');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger.json');

// handlebars {
const hbsConfig = exphbs.create({
  layoutsDir: path.join(__dirname, 'views/layouts/'),
  defaultLayout: 'main',
  extname: '.hbs',
});

app.engine('.hbs', hbsConfig.engine);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
// } handlebars

// API v1 {
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }) );

app.use('/api-v1', apiV1);
app.use('/api-v1-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// } API v1

// endpoints {
app.get('/home', (req, res) => {
  res.render('home', { home: true });
});

app.get('/features', (req, res) => {
  res.render('features', { features: true });
});

app.get('/news', (req, res) => {
  res.render('news', { news: true });
});
// } endpoints

app.use('**', (req, res) => {
  res.status(404).send('404 - Not Found :(');
});

// export {
module.exports = app;
// } export
