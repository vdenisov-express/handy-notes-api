const handlerFor = require('./../handlers');
const { UsersModel } = require('./../../users/users.model');


const tableUsers = new UsersModel();


module.exports = (req, res, next) => {

  tableUsers
    .checkEmail(req.body.email)

    .then(userObj => {
      if (userObj) req['user'] = userObj;
      next();
    })

    .catch(err => handlerFor.ERROR_ON_DATABASE(res, err));

}
