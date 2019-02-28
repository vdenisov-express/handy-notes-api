const handlerFor = require('@shared/handlers');
const authService = require('@api/auth/auth.service');

const { UsersModel } = require('./users.model');
const { NotesModel } = require('@api/notes/notes.model');
const { LikesModel } = require('@shared/models');


const tableUsers = new UsersModel();
const tableNotes = new NotesModel();
const tableLikes = new LikesModel();


module.exports = {

  // CREATE

  async create(req, res) {
    let userObj;
    const dataForCreation = {
      name:       req.body.name,
      email:      req.body.email,
      password:   req.body.password,

      phone:      req.body.phone || null,
      birthdate:  req.body.birthdate || null,
    }

    // check name {
    userObj = await tableUsers.checkName(dataForCreation.name);
    if (userObj)
      return handlerFor.ERROR_ON_VALIDATION(res, 'this `name` is already in use');
    // } check name

    // check email {
    userObj = await tableUsers.checkEmail(dataForCreation.email);
    if (userObj)
      return handlerFor.ERROR_ON_VALIDATION(res, 'this `email` is already in use');
    // } check email

    return tableUsers
      .create(dataForCreation)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'user is created !'))
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
      // check name {
      const userObj = await tableUsers.checkName(req.body.name);
      if (userObj)
        return handlerFor.ERROR_ON_VALIDATION(res, 'this `name` is already in use');
      // } check name
    }

    tableUsers
      .updateById(String(id), dataForUpdating)
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

  addLikeToNote(req, res) {
    const userId = parseInt(req.params.id);
    const noteId = req.body.noteId;

    const inputData = {
      Users_id: userId,
      Notes_id: noteId,
    };

    tableLikes
      .create(inputData)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'like is added !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // get notes for user
  getNotes(req, res) {
    const { id } = req.params;

    tableNotes
      .filterByUserId(id)
      .then(notesList => handlerFor.SUCCESS(res, 200, notesList))
      .catch(err => handlerFor.ERROR(res, err));

  },

  // get notes that user likes
  getLikedNotes(req, res) {
    const userId = parseInt(req.params.id);

    tableLikes
      .filterNotesByLikedCondition(userId)
      .then(notesList => handlerFor.SUCCESS(res, 200, notesList))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // remove like from note
  removeLikeFromNote(req, res) {
    const userId = parseInt(req.params.id);
    const noteId = req.body.noteId;

    tableLikes
      .deleteByUniquePairOfIds(userId, noteId)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'like is removed !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

}
