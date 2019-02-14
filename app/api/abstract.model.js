const { db } = require('./../../db/initialize');


class AbstractModel {

  constructor(tableName) {
    this.tableName = tableName;
  }

  // CREATE

  async create(data) {
    const columns = [];
    const values = [];

    for (let field in data) {
      columns.push( field );
      values.push( data[field] );
    }

    const creates = columns.join(', ');
    const questions = Array.from({length: values.length}, () => `(?)`);

    const sql = `INSERT INTO ${ this.tableName } (${ creates }) VALUES (${ questions })`;

    return await db.runAsync(sql, ...values);
  }

  // READ

  async getAll() {
    const sql = `SELECT * FROM ${ this.tableName }`;
    return await db.allAsync(sql);
  }

  async getById(id) {
    const sql = `SELECT * FROM ${ this.tableName } WHERE id = ${id}`;
    return await db.getAsync(sql);
  }

  // UPDATE

  async updateById(id, data) {
    const columns = [];
    const values = [];

    for (let field in data) {
      columns.push( `${ field } = (?)` );
      values.push( data[field] );
    }

    const updates = columns.join(', ');
    const sql = `UPDATE ${ this.tableName } SET ${updates} WHERE id = ${id}`;

    return await db.runAsync(sql, ...values);
  }

  // DELETE

  async deleteById(id) {
    const sql = `DELETE FROM ${ this.tableName } WHERE id = ${id}`;
    return await db.runAsync(sql);
  }

}


module.exports = { AbstractModel };
