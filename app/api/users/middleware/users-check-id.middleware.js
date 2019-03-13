const handlerFor = require('./../../../shared/handlers');
const { UsersModel } = require('./../../../../db/sqlite/models');


const tableUsers = new UsersModel();


module.exports = (req, res, next) => {

  const searchId = parseInt(req.params.id);

  if (isNaN(searchId)) {
    return handlerFor.ERROR_ON_VALIDATION(res, 'this `id` is invalid !');
  }

  tableUsers
    .checkId(searchId)

    .then(userObj => {
      if (userObj) {
        req.params.id = searchId;
        next();
      }

      else {
        return handlerFor.ERROR_NOT_FOUND(res, 'user with this `id` not found !');
      }
    })

    .catch(err => handlerFor.ERROR_ON_DATABASE(res, err));

}
