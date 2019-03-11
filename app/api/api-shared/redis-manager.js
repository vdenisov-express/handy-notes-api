const { redisClient } = require('@db-redis/initialize');


class RedisManager {

  async getData(key) {
    return await redisClient.getAsync(key);
  }

  async setData(key, value) {
    return await redisClient.setAsync(key, value);
  }

}


module.exports = { RedisManager };
