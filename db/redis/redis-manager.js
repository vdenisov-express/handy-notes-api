const { redisClient } = require('./redis.init');


class RedisManager {
  // read more: https://redis.io/commands#generic

  async getKey(key) {
    return await redisClient.getAsync(key);
  }

  async setKey(key, value) {
    return await redisClient.setAsync(key, value);
  }

  async delKey(key) {
    return await redisClient.delAsync(key);
  }

}


module.exports = { RedisManager };
