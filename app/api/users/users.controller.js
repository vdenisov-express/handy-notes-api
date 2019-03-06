const handlerFor = require('@shared/handlers');
const authService = require('@api/auth/auth.service');

const { UsersModel } = require('./users.model');
const { NotesModel } = require('@api/notes/notes.model');
const { LikesModel } = require('@shared/models');


const tableUsers = new UsersModel();
const tableNotes = new NotesModel();
const tableLikes = new LikesModel();


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

  // add like to note
  async addLikeToNote(req, res) {
    const userId = parseInt(req.params.id);
    const noteId = req.body.noteId;

    const inputData = {
      Users_id: userId,
      Notes_id: noteId,
    };

    try {
      await tableLikes.create(inputData);
      return handlerFor.SUCCESS(res, 200, null, 'like is added !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

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

  async getRating(req, res) {
    return handlerFor.STOPPER(res);
  },

  // remove like from note
  async removeLikeFromNote(req, res) {
    const userId = parseInt(req.params.id);
    const noteId = req.body.noteId;

    try {
      await tableLikes.deleteByUniquePairOfIds(userId, noteId);
      return handlerFor.SUCCESS(res, 200, null, 'like is removed !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

}
