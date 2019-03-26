const authService = require('./../auth.service');

module.exports = (req, res, next) => {
  const token = req.get('Authorization');
  const infoFromToken = authService.verifyToken(token);

  const { userId } = infoFromToken.data;
  req.token = { userId };

  next();
};
