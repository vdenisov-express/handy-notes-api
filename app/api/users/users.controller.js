const handlerFor = require('@shared/handlers');
const authService = require('@api/auth/auth.service');

const { UsersModel } = require('./users.model');
const { NotesModel } = require('@api/notes/notes.model');
const { LikesModel } = require('@shared/models');
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

  async redisTest(req, res) {
    const result = await redisManager.getData('string key');
    console.log({ result });

    return handlerFor.STOPPER(res);
  }

}
