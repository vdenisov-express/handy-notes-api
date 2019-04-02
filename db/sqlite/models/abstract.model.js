class AbstractModel {
  constructor (database, tableName) {
    this.database = database;
    this.tableName = tableName;
  }

  // CREATE

  async create (data) {
    const columns = [];
    const values = [];

    for (let field in data) {
      columns.push(field);
      values.push(data[field]);
    }

    const creates = columns.join(', ');
    const questions = Array.from({ length: values.length }, () => `(?)`);

    const sqlCreate = `INSERT INTO ${this.tableName} (${creates}) VALUES (${questions})`;
    this.database.run(sqlCreate, ...values);

    const sqlGetLast = `SELECT * FROM ${this.tableName} WHERE RowID = (SELECT last_insert_rowid())`;
    return this.database.getAsync(sqlGetLast);
  }

  // READ

  async getAll () {
    const sql = `SELECT * FROM ${this.tableName}`;
    return this.database.allAsync(sql);
  }

  async getById (id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;
    return this.database.getAsync(sql);
  }

  // UPDATE

  async updateById (id, data) {
    const columns = [];
    const values = [];

    for (let field in data) {
      columns.push(`${field} = (?)`);
      values.push(data[field]);
    }

    const updates = columns.join(', ');
    const sql = `UPDATE ${this.tableName} SET ${updates} WHERE id = ${id}`;

    return this.database.runAsync(sql, ...values);
  }

  // DELETE

  async deleteById (id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
    return this.database.runAsync(sql);
  }

  async deleteAll () {
    const sql = `DELETE FROM ${this.tableName}`;
    return this.database.runAsync(sql);
  }

  // ADDITIONALLY

  // check id
  async checkId (id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`;
    return this.database.getAsync(sql);
  }
}

module.exports = { AbstractModel };
