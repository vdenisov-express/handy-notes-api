const handlerFor = require('./../its-shared/handlers');

const { UsersModel } = require('./users.model');
const { NotesModel } = require('./../notes/notes.model');


const tableUsers = new UsersModel();
const tableNotes = new NotesModel();


module.exports = {

  // CREATE

  create(req, res) {
    const reqBody = req.body;

    const inputData = {
      name:       `${ reqBody.name }`,
      email:      `${ reqBody.email }`,
      phone:      `${ reqBody.phone }` || null,
      birthdate:  `${ reqBody.birthdate }` || null,
      password:   `${ reqBody.password }`,
    };

    tableUsers
      .create(inputData)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'user is created'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // READ

  getAll(req, res) {
    tableUsers
      .getAll()
      .then(usersList => handlerFor.SUCCESS(res, 200, usersList))
      .catch(err => handlerFor.ERROR(res, err));
  },

  getById(req, res) {
    const { id } = req.params;

    tableUsers
      .getById(id)
      .then(userObj => handlerFor.SUCCESS(res, 200, userObj))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // UPDATE

  updateById(req, res) {
    const { id } = req.params;
    const reqBody = req.body;

    const inputData = reqBody;

    tableUsers
      .updateById(id, inputData)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'user is updated !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // DELETE

  deleteById(req, res) {
    const { id } = req.params;

    tableUsers
      .deleteById(id)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'user is deleted !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // ##################################################

  // USER: NOTES

  getNotes(req, res) {
    const { id } = req.params;

    tableNotes
      .filterByUserId(id)
      .then(notesList => handlerFor.SUCCESS(res, 200, notesList))
      .catch(err => handlerFor.ERROR(res, err));

  }

}
