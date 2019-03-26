const { AbstractModel } = require('./abstract.model');


class UsersModel extends AbstractModel {

  constructor(db) {
    super(db, 'Users');
  }

  async getAll() {
    // hide Users.password
    const sql = `SELECT id, name, email, phone, birthdate, notes_count FROM ${this.tableName};`;
    return await this.database.allAsync(sql);
  }

  async getById(id) {
    // hide Users.password
    const sql = `SELECT id, name, email, phone, birthdate, notes_count FROM ${this.tableName} WHERE id = ${id}`;
    return await this.database.getAsync(sql);
  }

  async checkName(name) {
    const sql = `SELECT * FROM ${this.tableName} WHERE name = "${name}"`;
    return await this.database.getAsync(sql);
  }

  async checkEmail(email) {
    const sql = `SELECT * FROM ${this.tableName} WHERE email = "${email}"`;
    return await this.database.getAsync(sql);
  }

}


module.exports = { UsersModel };
