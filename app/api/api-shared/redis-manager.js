const { redisClient } = require('@db-redis/redis.init');


class RedisManager {

  async getData(key) {
    return await redisClient.getAsync(key);
  }

  async setData(key, value) {
    return await redisClient.setAsync(key, value);
  }

}


module.exports = { RedisManager };
