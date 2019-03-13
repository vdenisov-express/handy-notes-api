const { db } = require('@db-sqlite/sqlite.init');
const { AbstractModel } = require('./../../../db/sqlite/models');


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
