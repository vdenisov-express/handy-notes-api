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

// connecting databases
require('@db-sqlite/sqlite.init');
require('@db-redis/redis.init');
require('@db-mongo/mongo.init');

// connect features
initAPI(app);
initSite(app);
initSocket(server);

// handle error 404
app.use('**', (req, res) => {
  res.status(404).send('404 - Not Found :(');
});


module.exports = server;
