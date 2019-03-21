const authService = require('./auth.service');
const handlerFor = require('./../../shared/handlers');

const { UsersModel } = require('./../../../db/sqlite/models');
const { RatingWorker } = require('./../../../db/redis/workers');
const { ProfileSchema } = require('./../../../db/mongo/schemas');

const tableUsers = new UsersModel();
const workerRating = new RatingWorker();


// LOGIN ////////////////////////////////////////////////////////////////////////////////

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

  // Password verification
  const checkPass = authService.comparePasswords(req.body.password, userObj.password);

  if (!checkPass) {
    return handlerFor.ERROR_ON_AUTH(res, 'passwords don`t match, try again');
  }

  const token = authService.createToken(userObj.id);
  const result = { user: userObj, token };

  return handlerFor.SUCCESS(res, 200, result, 'user is logged in !');
}

// REGISTER ////////////////////////////////////////////////////////////////////////////////

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

  try {
    // (sqlite) create user
    userObj = await tableUsers.create({
      name:       req.body.name,
      email:      req.body.email,
      password:   hashedPass,

      phone:      req.body.phone || null,
      birthdate:  req.body.birthdate || null,
    });

    // // TODO: uncomment this {

    // // (redis) create rating variable for user
    // await workerRating.setKeyById(userObj.id, 0);

    // // (mongo) create profile for user
    // await new ProfileSchema({ userId: userObj.id }).save();

    // // } TODO: uncomment this

    // create token for user
    const token = authService.createToken(userObj.id);

    const result = { user: userObj, token };
    return handlerFor.SUCCESS(res, 200, result, 'user is registered !');
  } catch (err) {
      return handlerFor.ERROR(res, err);
  }

}

// ... ////////////////////////////////////////////////////////////////////////////////

// const newProfile = new ProfileSchema({
//   userId: req.params.id,
//   rating: req.body.rating,
// });
// const createdProfile = await newProfile.save();

module.exports.testJWT = (req, res) => handlerFor.STOPPER(res);
