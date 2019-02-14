const { db } = require('./../../../db/initialize');
const { AbstractModel } = require('./abstract.model');


class NotesTagsModel extends AbstractModel {

  constructor() {
    super(db, 'NotesTags');
  }

  async deleteByUniquePairOfIds(noteId, tagId) {
    const sql = `DELETE FROM NotesTags WHERE Notes_id = ${noteId} AND Tags_id = ${tagId}`;
    return await db.runAsync(sql);
  }

}


module.exports = { NotesTagsModel };
