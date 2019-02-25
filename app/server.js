const express = require('express');

const initSite = require('./site/site.init');
const initAPI  = require('./api/api.init');


const app = express();

// connecting static pages to the application
initSite(app);
console.log('* app => static site initialized');

// connecting the API to the application
initAPI(app);
console.log('* app => server API initialized');

module.exports = app;
