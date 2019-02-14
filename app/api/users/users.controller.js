const { Users } = require('./users.model');
const handlerFor = require('./../handlers');


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

    Users
      .create(inputData)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'user is created'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // READ

  getAll(req, res) {
    Users
      .getAll()
      .then(usersList => handlerFor.SUCCESS(res, 200, usersList))
      .catch(err => handlerFor.ERROR(res, err));
  },

  getById(req, res) {
    const { id } = req.params;
    Users
      .getById(id)
      .then(userObj => handlerFor.SUCCESS(res, 200, userObj))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // UPDATE

  updateById(req, res) {
    const { id } = req.params;
    const reqBody = req.body;

    const inputData = reqBody;

    Users
      .updateById(id, inputData)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'user is updated !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // DELETE

  deleteById(req, res) {
    const { id } = req.params;
    Users
      .deleteById(id)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'user is deleted !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

}
