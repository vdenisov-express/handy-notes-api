const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const initSite = require('./site/site.init');
const initAPI  = require('./api/api.init');


const app = express();

// CORS
app.use(cors());

// security
app.use(helmet());
app.disable('x-powered-by');

// connecting static pages to the application
initSite(app);
console.log('* app => static site initialized');

// connecting the API to the application
initAPI(app);
console.log('* app => server API initialized');


module.exports = app;
