const authService = require('./../../../app/api/auth/auth.service');
const passHash = authService.createPasswordHash('qwerty123');

module.exports.applyTo = (db) => {
  return db.run(`
    INSERT INTO Users
      (name,              email,                password,         phone,    birthdate)
    VALUES
      ("Leonardo",        "leo@gmail.com",      "${passHash}",    NULL,     NULL),
      ("Raphael",         "raph@gmail.com",     "${passHash}",    NULL,     NULL),
      ("Donatello",       "donnie@gmail.com",   "${passHash}",    NULL,     NULL),
      ("Michelangelo",    "mickey@gmail.com",   "${passHash}",    NULL,     NULL);
  `);
}
