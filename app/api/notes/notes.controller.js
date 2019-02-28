const handlerFor = require('@shared/handlers');
const authService = require('@api/auth/auth.service');

const { NotesModel } = require('./notes.model');
const { LikesModel, NotesTagsModel } = require('@shared/models');


const tableNotes = new NotesModel();
const tableLikes = new LikesModel();
const tableNotesTags = new NotesTagsModel();


module.exports = {

  // CREATE

  create(req, res) {
    const reqBody = req.body;

    const inputData = {
      title:    `${ reqBody.title }`,
      text:     `${ reqBody.text }`,
      Users_id: `${ reqBody.userId }`,
    };

    tableNotes
      .create(inputData)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'note is created !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // READ

  getAll(req, res) {
    tableNotes
      .getAll()
      .then(notesList => handlerFor.SUCCESS(res, 200, notesList))
      .catch(err => handlerFor.ERROR(res, err));
  },

  getById(req, res) {
    const { id } = req.params;

    tableNotes
      .getById(id)
      .then(noteObj => handlerFor.SUCCESS(res, 200, noteObj))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // UPDATE

  async updateById(req, res) {
    const { id } = req.params;
    const dataForUpdating = req.body;
    const noteObj = await tableNotes.getById(id)
      .catch(err => handlerFor.ERROR(res, err));

    const token = req.get('Authorization');
    const infoFromToken = authService.verifyToken(token);
    const { userId } = infoFromToken.data;

    if (noteObj.Users_id !== userId) {
      return handlerFor.ERROR_ON_PRIVILEGES(res);
    }

    tableNotes
      .updateById(id, dataForUpdating)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'note is updated !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // DELETE

  deleteById(req, res) {
    const { id } = req.params;

    tableNotes
      .deleteById(id)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'note is deleted !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // ##################################################

  // attach tag to note
  async attachTag(req, res) {
    const { id: noteId } = req.params;
    const { tagId } = req.body;
    const noteObj = await tableNotes.getById(noteId)
      .catch(err => handlerFor.ERROR(res, err));

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

    tableNotesTags
      .create(inputData)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'tag is attached !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // get tags for note
  getTags(req, res) {
    const noteId = parseInt(req.params.id);

    tableNotesTags
      .filterTagsByNoteId(noteId)
      .then(tagsList => handlerFor.SUCCESS(res, 200, tagsList))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // get user who liked this note
  getLikers(req, res) {
    const noteId = parseInt(req.params.id);

    tableLikes
      .filterUsersByIdOfLikedNote(noteId)
      .then(usersList => handlerFor.SUCCESS(res, 200, usersList))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // detach tag from note
  async detachTag(req, res) {
    const { id: noteId } = req.params;
    const { tagId } = req.body;
    const noteObj = await tableNotes.getById(noteId)
      .catch(err => handlerFor.ERROR(res, err));

    const token = req.get('Authorization');
    const infoFromToken = authService.verifyToken(token);
    const { userId } = infoFromToken.data;

    if (noteObj.Users_id !== userId) {
      return handlerFor.ERROR_ON_PRIVILEGES(res);
    }

    tableNotesTags
      .deleteByUniquePairOfIds(noteId, tagId)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'tag is detached !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

}
