const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const APP_CONFIG = config.get('APP');


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
    const token = jwt.sign({ userId }, APP_CONFIG.JWT_SECRET_KEY, { expiresIn: 60 * 60 });
    return `Bearer ${token}`;
  },

  verifyToken(token) {
    token = token.replace('Bearer ', '');
    const result = { success: false, data: null };

    jwt.verify(token, APP_CONFIG.JWT_SECRET_KEY, (err, decoded) => {
      if (!err) { result.success = true; result.data = decoded }
    });
    return result;
  }

}
