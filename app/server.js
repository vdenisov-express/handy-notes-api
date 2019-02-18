const express = require('express');

const initSite = require('./site/init');
const initAPI  = require('./api/init');


const app = express();

// connecting static pages to the application
initSite(app);

// connecting the API to the application
initAPI(app);


module.exports = app;
