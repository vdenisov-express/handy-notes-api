module.exports = {
  useJWT:           require('./auth-use-jwt.middleware'),
  decodeToken:       require('./auth-decode-token.middleware'),

  validateLogin:    require('./auth-validate-login.middleware'),
  validateRegister: require('./auth-validate-register.middleware'),
}
