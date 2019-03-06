const config = require('config');
const { Strategy, ExtractJwt } = require('passport-jwt');

const APP_CONFIG = config.get('APP');
const { UsersModel } = require('@api/users/users.model');


const tableUsers = new UsersModel();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: APP_CONFIG.JWT_SECRET_KEY
}


module.exports = (passport) => {
  const JwtStrategy = new Strategy(options, (payload, done) => {
    try {
      tableUsers
        .getById(payload.userId)
        .then(user => done(null, (user) ? user : false))
        .catch(err => done(err));
    } catch (err) {
        console.log(err.message || err);
        done(err);
    }
  });
  passport.use(JwtStrategy);
}
