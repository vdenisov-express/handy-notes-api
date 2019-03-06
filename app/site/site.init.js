const path = require('path');
const exphbs  = require('express-handlebars');
const express = require('express');


module.exports = function initialize(app) {

  // handlebars: configs {

  const hbsConfig = exphbs.create({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'main',
    extname: '.hbs',
  });

  app.engine('.hbs', hbsConfig.engine);

  app.set('view engine', '.hbs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(express.static(path.join(__dirname, 'static')));

  // } handlebars: configs

  // pages: routes {

  app.get('/home', (req, res) => {
    res.render('page-home', { home: true });
  });

  app.get('/features', (req, res) => {
    res.render('page-features', { features: true });
  });

  app.get('/news', (req, res) => {
    res.render('page-news', { news: true });
  });

  app.get('/logs', (req, res) => {
    res.render('page-logs', { logs: true });
  });

  // } pages: routes

}


