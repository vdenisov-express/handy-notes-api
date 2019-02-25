const { db } = require('./../../../db/initialize');
const { AbstractModel } = require('./../api-shared/models');


class UsersModel extends AbstractModel {

  constructor() {
    super(db, 'Users');
  }

  async checkEmail(email) {
    const sql = `SELECT * FROM Users WHERE email = "${email}"`;
    return await db.getAsync(sql);
  }

}


module.exports = { UsersModel };
