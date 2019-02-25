const handlerFor = require('@shared/handlers');
const { UsersModel } = require('@api/users/users.model');


const tableUsers = new UsersModel();


module.exports = (req, res, next) => {

  tableUsers
    .checkId(req.params.id)

    .then(userObj => {
      userObj ? next() : handlerFor.ERROR_NOT_FOUND(res, 'user with this `id` not found !')
    })

    .catch(err => handlerFor.ERROR_ON_DATABASE(res, err));

}
