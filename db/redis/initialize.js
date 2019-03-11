const redis = require("redis");
const Promise = require('bluebird');


Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);


const redisClient = redis.createClient({
  host: "redis-19213.c57.us-east-1-4.ec2.cloud.redislabs.com",
  port: 19213,
  password: "ONVvgbiDiEzW76lLSkP6dC1b92R2Q1gI"
});


module.exports = { redisClient };
