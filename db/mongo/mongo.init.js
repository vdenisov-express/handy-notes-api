const mongoose = require('mongoose');

const config = require('config');
const MONGO_CONFIG = config.get('DATABASE.MONGO');

mongoose
  .connect(MONGO_CONFIG.URL, {useNewUrlParser: true})
  .then(() => console.log('* db Mongo => connected !'))
  .catch(() => console.log('* db Mongo => error !!!'));

const mongoClient = mongoose.connection;


module.exports = { mongoClient }
