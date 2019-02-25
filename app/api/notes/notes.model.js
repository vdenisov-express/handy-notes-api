const { db } = require('@database/initialize');
const { AbstractModel } = require('@shared/models');


class NotesModel extends AbstractModel {

  constructor() {
    super(db, 'Notes');
  }

  async checkId(id) {
    const sql = `SELECT * FROM Notes WHERE id = ${id}`;
    return await this.database.getAsync(sql);
  }

  async filterByUserId(id) {
    const sql = `SELECT * FROM Notes WHERE Users_id = ${id}`;
    return await db.allAsync(sql);
  }

}


module.exports = { NotesModel };
