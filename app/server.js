// libs {
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
// } libs

const app = express();

// handlebars {
const hbsConfig = exphbs.create({
  layoutsDir: path.join(__dirname, 'views/layouts/'),
  defaultLayout: 'main',
  extname: '.hbs',
});

app.engine('.hbs', hbsConfig.engine);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
// } handlebars

// endpoints {
app.get('/', (req, res) => res.render('home'));
app.get('/features', (req, res) => res.render('features'));
app.get('/news', (req, res) => res.render('news'));
// } endpoints

// export {
module.exports = app;
// } export
