const authService = require('./auth.service');
const handlerFor = require('./../api-shared/handlers');
const { UsersModel } = require('./../users/users.model');


const tableUsers = new UsersModel();


module.exports.login = async (req, res) => {
  let userObj;

  try {
    // check email {
    userObj = await tableUsers.checkEmail(req.body.email);
    if (!userObj) {
      return handlerFor.ERROR_ON_VALIDATION(res, 'user with this `email` not found !');
    }
    // } check email
  } catch (err) {
      return handlerFor.ERROR(res, err);
  }

  const dataForLogin = req.body;

  // Password verification
  const checkPass = authService.comparePasswords(dataForLogin.password, userObj.password);

  if (!checkPass) {
    return handlerFor.ERROR_ON_AUTH(res, 'passwords don`t match, try again');
  }

  const token = authService.createToken(userObj.id);
  return handlerFor.SUCCESS(res, 200, {token}, 'user is logged in !');
}


module.exports.register = async (req, res) => {
  let userObj;

  try {
    // check name {
    userObj = await tableUsers.checkName(req.body.name);
    if (userObj) {
      return handlerFor.ERROR_ON_VALIDATION(res, 'this `name` is already in use');
    }
    // } check name

    // check email {
    userObj = await tableUsers.checkEmail(req.body.email);
    if (userObj)
      return handlerFor.ERROR_ON_VALIDATION(res, 'this `email` is already in use');
    // } check email
  } catch (err) {
      return handlerFor.ERROR(res, err);
  }

  // Create hash from password
  const hashedPass = authService.createPasswordHash(req.body.password);

  const dataForRegister = {
    name:       req.body.name,
    email:      req.body.email,
    password:   hashedPass,

    phone:      req.body.phone || null,
    birthdate:  req.body.birthdate || null,
  };

  try {
    await tableUsers.create(dataForRegister);
    return handlerFor.SUCCESS(res, 200, null, 'user is registered !');
  } catch (err) {
      return handlerFor.ERROR(res, err);
  }

}


module.exports.testJWT = (req, res) => handlerFor.STOPPER(res);
