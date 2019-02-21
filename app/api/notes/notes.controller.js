const handlerFor = require('./../api-shared/handlers');

const { NotesModel } = require('./notes.model');
const { NotesTagsModel } = require('./../api-shared/notes-tags.model');
const { LikesModel } = require('./../api-shared/likes.model');


const tableNotes = new NotesModel();
const tableNotesTags = new NotesTagsModel();
const tableLikes = new LikesModel();


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

  updateById(req, res) {
    const { id } = req.params;
    const reqBody = req.body;

    const inputData = reqBody;

    tableNotes
      .updateById(id, inputData)
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
  attachTag(req, res) {
    const noteId = parseInt(req.params.id);
    const tagId = req.body.tagId;

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
  detachTag(req, res) {
    const noteId = parseInt(req.params.id);
    const tagId = req.body.tagId;

    tableNotesTags
      .deleteByUniquePairOfIds(noteId, tagId)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'tag is detached !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

}
