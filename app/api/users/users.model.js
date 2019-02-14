const { AbstractModel } = require('./../abstract.model');


class UsersModel extends AbstractModel {

  constructor() {
    super('Users');
  }

}


module.exports = { UsersModel };
