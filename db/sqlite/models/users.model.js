const { db } = require('@db-sqlite/sqlite.init');
const { AbstractModel } = require('./abstract.model');


class UsersModel extends AbstractModel {

  constructor() {
    super(db, 'Users');
  }

  async getAll() {
    // hide Users.password
    const sql = `SELECT id, name, email, phone, birthdate, notes_count FROM Users;`;
    return await this.database.allAsync(sql);
  }

  async getById(id) {
    // hide Users.password
    const sql = `SELECT id, name, email, phone, birthdate, notes_count FROM Users WHERE id = ${id}`;
    return await this.database.getAsync(sql);
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
