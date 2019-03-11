const handlerFor = require('./../api-shared/handlers');
const authService = require('./../auth/auth.service');

const { NotesModel } = require('./notes.model');
const { LikesModel, NotesTagsModel } = require('./../api-shared/models');


const tableNotes = new NotesModel();
const tableLikes = new LikesModel();
const tableNotesTags = new NotesTagsModel();


module.exports = {

  // CREATE

  async create(req, res) {
    const reqBody = req.body;

    const inputData = {
      title:    `${ reqBody.title }`,
      text:     `${ reqBody.text }`,
      Users_id: `${ reqBody.userId }`,
    };

    try {
      await tableNotes.create(inputData);
      return handlerFor.SUCCESS(res, 200, null, 'note is created !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // READ

  async getAll(req, res) {
    try {
      const notesList = await tableNotes.getAll();
      return handlerFor.SUCCESS(res, 200, notesList);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  async getById(req, res) {
    const { id } = req.params;

    try {
      const noteObj = await tableNotes.getById(id);
      return handlerFor.SUCCESS(res, 200, noteObj);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // UPDATE

  async updateById(req, res) {
    const { id } = req.params;
    const dataForUpdating = req.body;
    let noteObj;

    try {
      noteObj = await tableNotes.getById(id)
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }

    const token = req.get('Authorization');
    const infoFromToken = authService.verifyToken(token);
    const { userId } = infoFromToken.data;

    if (noteObj.Users_id !== userId) {
      return handlerFor.ERROR_ON_PRIVILEGES(res);
    }

    try {
      await tableNotes.updateById(id, dataForUpdating);
      return handlerFor.SUCCESS(res, 200, null, 'note is updated !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // DELETE

  async deleteById(req, res) {
    const { id } = req.params;

    try {
      await tableNotes.deleteById(id);
      return handlerFor.SUCCESS(res, 200, null, 'note is deleted !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // ##################################################

  /* NOTES => LIKES */

  // add like to note
  async addLikeToNote(req, res) {
    const noteId = parseInt(req.params.id);
    const userId = req.body.userId;

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

  // remove like from note
  async removeLikeFromNote(req, res) {
    const noteId = parseInt(req.params.id);
    const userId = req.body.userId;

    try {
      await tableLikes.deleteByUniquePairOfIds(userId, noteId);
      return handlerFor.SUCCESS(res, 200, null, 'like is removed !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // get user who liked this note
  async getLikers(req, res) {
    const noteId = parseInt(req.params.id);

    try {
      const usersList = await tableLikes.filterUsersByIdOfLikedNote(noteId);
      return handlerFor.SUCCESS(res, 200, usersList);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // ##################################################

  /* NOTES => TAGS */

  // attach tag to note
  async attachTag(req, res) {
    const { id: noteId } = req.params;
    const { tagId } = req.body;
    let noteObj;

    try {
      noteObj = await tableNotes.getById(noteId);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }

    const token = req.get('Authorization');
    const infoFromToken = authService.verifyToken(token);
    const { userId } = infoFromToken.data;

    if (noteObj.Users_id !== userId) {
      return handlerFor.ERROR_ON_PRIVILEGES(res);
    }

    const inputData = {
      Notes_id: noteId,
      Tags_id:  tagId,
    };

    try {
      await tableNotesTags.create(inputData);
      return handlerFor.SUCCESS(res, 200, null, 'tag is attached !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // get tags for note
  async getTags(req, res) {
    const noteId = parseInt(req.params.id);

    try {
      const tagsList = await tableNotesTags.filterTagsByNoteId(noteId);
      return handlerFor.SUCCESS(res, 200, tagsList);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // detach tag from note
  async detachTag(req, res) {
    const { id: noteId } = req.params;
    const { tagId } = req.body;
    let noteObj;

    try {
      noteObj = await tableNotes.getById(noteId);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }

    const token = req.get('Authorization');
    const infoFromToken = authService.verifyToken(token);
    const { userId } = infoFromToken.data;

    if (noteObj.Users_id !== userId) {
      return handlerFor.ERROR_ON_PRIVILEGES(res);
    }

    try {
      await tableNotesTags.deleteByUniquePairOfIds(noteId, tagId);
      return handlerFor.SUCCESS(res, 200, null, 'tag is detached !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // ##################################################

}
