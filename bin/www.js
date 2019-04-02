require('module-alias/register');

const app = require('./../app/server');

const config = require('config');
const SERVER_CONFIG = config.get('SERVER');

app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`* app => listening on port ${SERVER_CONFIG.PORT}! ["${config.get('MODE')}" mode]`);
});
