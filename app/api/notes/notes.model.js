const { db } = require('@db-sqlite/sqlite.init');
const { AbstractModel } = require('./../api-shared/models');


class NotesModel extends AbstractModel {

  constructor() {
    super(db, 'Notes');
  }

  async filterByUserId(id) {
    const sql = `SELECT * FROM Notes WHERE Users_id = ${id}`;
    return await db.allAsync(sql);
  }

  async getSumLikesForNotesByUserId(id) {
    const sql = `SELECT SUM(likes_count) FROM Notes WHERE Users_id = ${id}`;
    return await db.getAsync(sql);
  }

}


module.exports = { NotesModel };
