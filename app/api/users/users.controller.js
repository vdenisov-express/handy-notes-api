const { Users } = require('./users.model');


module.exports = {

  // CREATE

  create(req, res) {
    const reqBody = req.body;

    const inputData = {
      name:       reqBody.name,
      email:      reqBody.email,
      phone:      reqBody.phone || null,
      birthdate:  reqBody.birthdate || null,
      password:   reqBody.password,
    };

    Users
      .create(inputData)
      .then(() => handlerSuccess(res, 200, null, 'user is created'))
      .catch(err => handlerError(res, err));
  },

  // READ

  getAll(req, res) {
    Users
      .getAll()
      .then(usersList => handlerSuccess(res, 200, usersList))
      .catch(err => handlerError(res, err));
  },

  getById(req, res) {
    const { id } = req.params;
    Users
      .getById(id)
      .then(userObj => handlerSuccess(res, 200, userObj))
      .catch(err => handlerError(res, err));
  },

  // UPDATE

  updateById(req, res) {
    const { id } = req.params;
    const reqBody = req.body;

    const inputData = reqBody;

    Users
      .updateById(id, inputData)
      .then(() => handlerSuccess(res, 200, null, 'user is updated !'))
      .catch(err => handlerError(res, err));
  },

  // DELETE

  deleteById(req, res) {
    const { id } = req.params;
    Users
      .deleteById(id)
      .then(() => handlerSuccess(res, 200, null, 'user is deleted !'))
      .catch(err => handlerError(res, err));
  },

}

function handlerSuccess(response, status, data = null, message = null) {
  const results = {};

  if (data) {
    results['data'] = data;
    results['total'] = data.length;
  }

  if (message) {
    results['message'] = message;
  }

  return response
    .status(status)
    .json(results);
}

function handlerError(res, err) {
  return res.status(500).json(err);
}
