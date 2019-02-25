const { db } = require('./../../../db/initialize');
const { AbstractModel } = require('./../api-shared/models/abstract.model');


class NotesModel extends AbstractModel {

  constructor() {
    super(db, 'Notes');
  }

  async filterByUserId(id) {
    const sql = `SELECT * FROM Notes WHERE Users_id = ${id}`;
    return await db.allAsync(sql);
  }

}


module.exports = { NotesModel };
