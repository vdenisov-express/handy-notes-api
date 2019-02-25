module.exports = {
  checkId:          require('./users-check-id.middleware'),
  checkEmail:       require('./users-check-email.middleware'),

  validateCreation: require('./users-validate-creation.middleware'),
  validateUpdating: require('./users-validate-updating.middleware'),
}
