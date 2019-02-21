const authService = require('./auth.service');
const handlerFor = require('./../its-shared/handlers');
const { UsersModel } = require('./../users/users.model');


const tableUsers = new UsersModel();


module.exports.login = (req, res) => {
  const reqBody = req.body;

  const inputData = {
    email:      `${ reqBody.email }`,
    password:   `${ reqBody.password }`,
  };

  tableUsers
    .checkEmail(inputData.email)

    .then(userObj => {
      // User was found by "email"
      if (userObj) {

        // Password verification
        const checkPass = authService.comparePasswords(inputData.password, userObj.password);

        // Password is correct
        if (checkPass) {
          const token = authService.createToken(userObj.id);
          return handlerFor.SUCCESS(res, 200, {token}, 'user is logged in !');
        }

        // Wrong password
        else {
          return handlerFor.ERROR_ON_AUTH(res, 'passwords don`t match, try again');
        }
      }

      // Unknown email
      else {
        return handlerFor.ERROR_NOT_FOUND(res, 'email not found');
      }
    })

    // Unknown error in database
    .catch(err => handlerFor.ERROR_ON_DATABASE(res, err));
}


module.exports.register = (req, res) => {
  const reqBody = req.body;

  const inputData = {
    name:       `${ reqBody.name }`,
    email:      `${ reqBody.email }`,
    phone:      `${ reqBody.phone }` || null,
    birthdate:  `${ reqBody.birthdate }` || null,
    password:   `${ reqBody.password }`,
  };

  tableUsers
    .checkEmail(inputData.email)

    .then(userObj => {
      // User was found by "email"
      if (userObj) {
        return handlerFor.ERROR_ON_AUTH(res, 'this email is already in use');
      }

      // Unknown email
      else {
        // Create hash from password
        const hashedPass = authService.createPasswordHash(inputData.password);

        // Save hash of password in database, not password
        inputData.password = hashedPass;

        tableUsers
          .create(inputData)
          .then(() => handlerFor.SUCCESS(res, 200, null, 'user is registered !'))
          .catch(err => handlerFor.ERROR(res, err));
      }
    })

    // Unknown error in database
    .catch(err => handlerFor.ERROR_ON_DATABASE(res, err));

}
