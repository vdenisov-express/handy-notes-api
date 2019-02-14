class AbstractModel {

  constructor(dbConnection, tableName) {
    this.database = dbConnection;
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

    return await this.database.runAsync(sql, ...values);
  }

  // READ

  async getAll() {
    const sql = `SELECT * FROM ${ this.tableName }`;
    return await this.database.allAsync(sql);
  }

  async getById(id) {
    const sql = `SELECT * FROM ${ this.tableName } WHERE id = ${id}`;
    return await this.database.getAsync(sql);
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

    return await this.database.runAsync(sql, ...values);
  }

  // DELETE

  async deleteById(id) {
    const sql = `DELETE FROM ${ this.tableName } WHERE id = ${id}`;
    return await this.database.runAsync(sql);
  }

}


module.exports = { AbstractModel };
