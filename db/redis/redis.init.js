const redis = require('redis');
const Promise = require('bluebird');

const config = require('config');
const REDIS_CONFIG = config.get('DATABASE.REDIS');


Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);


const redisClient = redis.createClient({
  host:     REDIS_CONFIG.HOST,
  port:     REDIS_CONFIG.PORT,
  password: REDIS_CONFIG.PASS,
});


module.exports = { redisClient };
