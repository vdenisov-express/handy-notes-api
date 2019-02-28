const express = require('express');

const initSite = require('./site/site.init');
const initAPI  = require('./api/api.init');

// security {
const helmet = require('helmet');
// } security


const app = express();

// connecting static pages to the application
initSite(app);
console.log('* app => static site initialized');

// connecting the API to the application
initAPI(app);
console.log('* app => server API initialized');

// security {
app.use(helmet());
app.disable('x-powered-by');
// } security


module.exports = app;
