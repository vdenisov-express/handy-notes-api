const handlerFor = require('./../api-shared/handlers');
const authService = require('./../auth/auth.service');

const { UsersModel } = require('./users.model');
const { NotesModel } = require('./../notes/notes.model');
const { LikesModel } = require('./../api-shared/models');
const { RedisManager } = require('./../api-shared/redis-manager');


const tableUsers = new UsersModel();
const tableNotes = new NotesModel();
const tableLikes = new LikesModel();
const redisManager = new RedisManager();


module.exports = {

  // READ

  async getAll(req, res) {
    try {
      const usersList = await tableUsers.getAll();
      return handlerFor.SUCCESS(res, 200, usersList);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  async getById(req, res) {
    const { id } = req.params;

    try {
      const userObj = await tableUsers.getById(id);
      return handlerFor.SUCCESS(res, 200, userObj);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // UPDATE

  async updateById(req, res) {
    const { id } = req.params;
    const dataForUpdating = req.body;

    const token = req.get('Authorization');
    const infoFromToken = authService.verifyToken(token);
    const { userId } = infoFromToken.data;

    if (id !== userId) {
      return handlerFor.ERROR_ON_PRIVILEGES(res);
    }

    if (dataForUpdating.name) {
      try {
        // check name {
        const userObj = await tableUsers.checkName(req.body.name);
        if (userObj) {
          return handlerFor.ERROR_ON_VALIDATION(res, 'this `name` is already in use');
        }
        // } check name
      } catch (err) {
          return handlerFor.ERROR(res, err);
      }
    }

    try {
      await tableUsers.updateById(333, dataForUpdating);
      return handlerFor.SUCCESS(res, 200, null, 'user is updated !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // DELETE

  async deleteById(req, res) {
    const { id } = req.params;

    try {
      await tableUsers.deleteById(id);
      return handlerFor.SUCCESS(res, 200, null, 'user is deleted !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // ##################################################

  // get notes for user
  async getNotes(req, res) {
    const { id } = req.params;

    try {
      const notesList = await tableNotes.filterByUserId(id);
      return handlerFor.SUCCESS(res, 200, notesList);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // get notes that user likes
  async getLikedNotes(req, res) {
    const userId = parseInt(req.params.id);

    try {
      const notesList = await tableLikes.filterNotesByLikedCondition(userId);
      return handlerFor.SUCCESS(res, 200, notesList);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // get total likes for user
  async getRating(req, res) {
    const userId = parseInt(req.params.id);

    try {
      const sumOfLikes = await tableNotes.getSumLikesForNotesByUserId(userId);
      const result = { rating: Object.values(sumOfLikes)[0] };
      return handlerFor.SUCCESS(res, 200, result);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // REDIS {

  // compare raiting for user [ Sqlite vs Redis ]
  async compareRating(req, res) {
    const userId = parseInt(req.params.id);

    try {
      const sumOfLikes = await tableNotes.getSumLikesForNotesByUserId(userId);

      const ratingFromSqlite = Object.values(sumOfLikes)[0];
      const ratingFromRedis = parseInt( await redisManager.getData(`user-${ userId }`) );

      const data = { ratingFromSqlite, ratingFromRedis };

      if (ratingFromSqlite !== ratingFromRedis) {
        return handlerFor.SUCCESS(res, 200, data, 'user rating in Sqlite and in Redis do not match');
      }

      return handlerFor.SUCCESS(res, 200, data, 'user rating from Redis is up to date');
    } catch (err) {
      return handlerFor.ERROR(res, err);
    }
  },

  // synchronize raiting for user [ Sqlite & Redis ]
  async synchronizeRating(req, res) {
    const userId = parseInt(req.params.id);

    try {
      const sumOfLikes = await tableNotes.getSumLikesForNotesByUserId(userId);

      const ratingFromSqlite = Object.values(sumOfLikes)[0];
      redisManager.setData(`user-${ userId }`, ratingFromSqlite);
      const ratingFromRedis = parseInt( await redisManager.getData(`user-${ userId }`) );

      const data = { ratingFromSqlite, ratingFromRedis };

      if (ratingFromSqlite !== ratingFromRedis) {
        return handlerFor.SUCCESS(res, 200, data, 'user rating in Sqlite and in Redis do not match');
      }

      return handlerFor.SUCCESS(res, 200, data, 'user rating from Redis is up to date');
    } catch (err) {
      return handlerFor.ERROR(res, err);
    }

  },

  // } REDIS

  async getTagsForNotes(req, res) {
    const userId = parseInt(req.params.id);

    try {
      const data = await tableNotes.getTagsForNotesByUserId(userId);
      console.log(data);
      return handlerFor.SUCCESS(res, 200, data);
    } catch (err) {
      return handlerFor.ERROR(res, err);
    }
  },

}
