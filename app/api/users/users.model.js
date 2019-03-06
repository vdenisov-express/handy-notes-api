const { db } = require('@database/initialize');
const { AbstractModel } = require('@shared/models');


class UsersModel extends AbstractModel {

  constructor() {
    super(db, 'Users');
  }

  async checkName(name) {
    const sql = `SELECT * FROM Users WHERE name = "${name}"`;
    return await db.getAsync(sql);
  }

  async checkEmail(email) {
    const sql = `SELECT * FROM Users WHERE email = "${email}"`;
    return await db.getAsync(sql);
  }

}


module.exports = { UsersModel };
