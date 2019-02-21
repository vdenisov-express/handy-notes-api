const { db } = require('./../../../db/initialize');
const { AbstractModel } = require('./../api-shared/abstract.model');


class UsersModel extends AbstractModel {

  constructor() {
    super(db, 'Users');
  }

}


module.exports = { UsersModel };
