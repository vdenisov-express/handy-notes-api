const config = require('config');
const { Strategy, ExtractJwt } = require('passport-jwt');

const APP_CONFIG = config.get('APP');
const { db } = require('@db-sqlite/sqlite.init');
const { UsersModel } = require('./../../../../db/sqlite/models');

const tableUsers = new UsersModel(db);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: APP_CONFIG.JWT_SECRET_KEY
};

module.exports = (passport) => {
  const JwtStrategy = new Strategy(options, (payload, done) => {
    try {
      tableUsers
        .getById(payload.userId)
        .then(user => done(null, (user) || false))
        .catch(err => done(err));
    } catch (err) {
      console.log(err.message || err);
      done(err);
    }
  });
  passport.use(JwtStrategy);
};
