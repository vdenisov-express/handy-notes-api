const cors = require('cors');
const helmet = require('helmet');

const initAPI  = require('./api/api.init');
const initSite = require('./site/site.init');
const initSocket = require('./socket/socket.init');


const app = require('express')();
const server = require('http').Server(app);


// CORS
app.use(cors());

// security
app.use(helmet());
app.disable('x-powered-by');

// connecting MongoDB
require('./../db/mongo/mongo.init');

// connecting the API to the application
initAPI(app);
console.log('* app => server API initialized');

// connecting static pages to the application
initSite(app);
console.log('* app => static site initialized');

// add socket connection to the application
initSocket(server);
console.log('* app => socket connection initialized');


module.exports = server;
