const { db } = require('./../../../db/initialize');


class Users {

  // CREATE

  static async create(data) {
    const columns = [];
    const values = [];

    for (let field in data) {
      columns.push( field );
      values.push( data[field] );
    }

    const creates = columns.join(', ');
    const questions = Array.from({length: values.length}, () => `(?)`);

    const sql = `INSERT INTO Users (${creates}) VALUES (${questions})`;

    console.log(sql)

    return await db.runAsync(sql, ...values);
  }

  // READ

  static async getAll() {
    const sql = `SELECT * FROM Users`;
    return await db.allAsync(sql);
  }

  static async getById(userId) {
    const sql = `SELECT * FROM Users WHERE id = ${userId}`;
    return await db.getAsync(sql);
  }

  // UPDATE

  static async updateById(userId, data) {
    const columns = [];
    const values = [];

    for (let field in data) {
      columns.push( `${ field } = (?)` );
      values.push( data[field] );
    }

    const updates = columns.join(', ');
    const sql = `UPDATE Users SET ${updates} WHERE id = ${userId}`;

    return await db.runAsync(sql, ...values);
  }

  // DELETE

  static async deleteById(userId) {
    const sql = `DELETE FROM Users WHERE id = ${userId}`;
    return await db.runAsync(sql);
  }

}


module.exports = { Users };
