const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const config = {
  jwtSecret: 'abcdefg12345',
};


module.exports = {

  createPasswordHash(receivedPassword) {
    const createdSalt = bcrypt.genSaltSync(10);
    const createdHash = bcrypt.hashSync(receivedPassword, createdSalt);
    return createdHash;
  },

  comparePasswords(receivedPasswordFromUser, hashedPasswordFromDatabase) {
    return bcrypt.compareSync(
      receivedPasswordFromUser,
      hashedPasswordFromDatabase
    );
  },

  createToken(userId) {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: 60 * 60 });
  },

  verifyToken(token) {
    const result = { success: false, data: null };
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (!err) { result.success = true; result.data = decoded }
    });
    return result;
  }

}
