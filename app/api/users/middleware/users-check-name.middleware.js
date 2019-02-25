const handlerFor = require('@shared/handlers');
const { UsersModel } = require('@api/users/users.model');


const tableUsers = new UsersModel();


module.exports = (req, res, next) => {

  tableUsers
    .checkName(req.body.name)

    .then(userObj => {
      userObj ? next() : handlerFor.ERROR_NOT_FOUND(res, 'this `name` is already in use')
    })

    .catch(err => handlerFor.ERROR_ON_DATABASE(res, err));

}
