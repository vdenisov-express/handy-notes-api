const handlerFor = require('./../../shared/handlers');
const authService = require('./../auth/auth.service');

const { UsersModel, NotesModel, LikesModel } = require('./../../../db/sqlite/models');
const { RedisManager } = require('./../../../db/redis/redis-manager');
const { ProfileSchema } = require('./../../../db/mongo/schemas');

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

  // REDIS {

  // get total likes for user [ Redis ]
  async getRating(req, res) {
    const userId = parseInt(req.params.id);

    try {
      const ratingFromRedis = parseInt( await redisManager.getData(`user-${ userId }`) );
      return handlerFor.SUCCESS(res, 200, { ratingFromRedis });
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // compare raiting for user [ Sqlite vs Redis ]
  async compareRating(req, res) {
    const userId = parseInt(req.params.id);

    try {
      const { rating: ratingFromSqlite } = await tableNotes.getSumLikesForNotesByUserId(userId);
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
      const { rating: ratingFromSqlite } = await tableNotes.getSumLikesForNotesByUserId(userId);
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

  // STATISTIC {

  // get tags for all user notes
  async getTagsForNotes(req, res) {
    const userId = parseInt(req.params.id);

    try {
      const tagsList = await tableNotes.getTagsForNotesByUserId(userId);
      return handlerFor.SUCCESS(res, 200, tagsList);
    } catch (err) {
      return handlerFor.ERROR(res, err);
    }
  },

  // get last notes for user
  async getLastNotes(req, res) {
    const userId = parseInt(req.params.id);
    const limit = parseInt(req.query.limit) || 10;

    try {
      const notesList = await tableNotes.getLimitedNumberOfLastUserNotes(userId, limit);
      return handlerFor.SUCCESS(res, 200, notesList);
    } catch (err) {
      return handlerFor.ERROR(res, err);
    }
  },

  // get rating among all users
  async getTotalRating(req, res) {
    const userId = parseInt(req.params.id);

    try {
      const ratingList = await tableNotes.getTotalRatingAmongAllUsersByLikes();
      const place = ratingList.findIndex(item => item.id === userId) + 1;

      const data = { ratingList, place };
      return handlerFor.SUCCESS(res, 200, data);
    } catch (err) {
      return handlerFor.ERROR(res, err);
    }
  },

  // } STATISTIC

  // MONGO {

  // get all profiles
  async mongoGetAllProfiles(req, res) {
    try {
      const profilesList = await ProfileSchema.find({});
      return handlerFor.SUCCESS(res, 200, profilesList);
    } catch (err) {
      return handlerFor.ERROR(res, err);
    }
  },

  // create user profile
  async mongoCreateProfile(req, res) {
    const newProfile = new ProfileSchema({
      userId: req.params.id,
      rating: req.body.rating,
    });

    try {
      const createdProfile = await newProfile.save();
      return handlerFor.SUCCESS(res, 200, createdProfile);
    } catch (err) {
      return handlerFor.ERROR_ON_VALIDATION(res, 'profile already exists for this user !');
    }
  },

  // get user profile
  async mongoGetUserProfile(req, res) {
    try {
      const dataProfile = await ProfileSchema.findOne({
        userId: req.params.id
      });
      if (!dataProfile) {
        return handlerFor.ERROR_NOT_FOUND(res, 'profile not found !');
      }
      return handlerFor.SUCCESS(res, 200, dataProfile);
    } catch (err) {
      return handlerFor.ERROR(res, err);
    }
  },

  // update user profile
  async mongoUpdateUserProfile(req, res) {
    try {
      const updatedProfile = await ProfileSchema.findOneAndUpdate(
        { userId: req.params.id },
        { rating: req.body.rating },
        { new: true },
      );
      if (!updatedProfile) {
        return handlerFor.ERROR_NOT_FOUND(res, 'profile not found !');
      }
      return handlerFor.SUCCESS(res, 200, updatedProfile);
    } catch (err) {
      return handlerFor.ERROR(res, err);
    }
  },

  // delete user profile
  async mongoRemoveUserProfile(req, res) {
    try {
      const removedProfile = await ProfileSchema.findOneAndRemove({
        userId: req.params.id
      });
      if (!removedProfile) {
        return handlerFor.ERROR_NOT_FOUND(res, 'profile not found !');
      }
      return handlerFor.SUCCESS(res, 200, null, 'user profile removed !');
    } catch (err) {
      return handlerFor.ERROR(res, err);
    }
  },

  // } MONGO

}
