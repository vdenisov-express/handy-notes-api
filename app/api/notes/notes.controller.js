const { NotesModel } = require('./notes.model');
const handlerFor = require('./../handlers');


const tableNotes = new NotesModel();


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
      .then(() => handlerFor.SUCCESS(res, 200, null, 'note is created'))
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

}
