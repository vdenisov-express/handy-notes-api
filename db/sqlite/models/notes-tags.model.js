const { AbstractModel } = require('./abstract.model');


class NotesTagsModel extends AbstractModel {

  constructor(db) {
    super(db, 'NotesTags');
  }

  async filterTagsByNoteId(noteId) {
    const sql =  `SELECT Tags.* FROM NotesTags
                  INNER JOIN Tags ON NotesTags.Tags_id = Tags.id
                  WHERE NotesTags.Notes_id = ${noteId}`;
    return await this.database.allAsync(sql);
  }

  async filterNotesByTagId(tagId) {
    const sql =  `SELECT Notes.* FROM NotesTags
                  INNER JOIN Notes ON NotesTags.Notes_id = Notes.id
                  WHERE NotesTags.Tags_id = ${tagId}`;
    return await this.database.allAsync(sql);
  }

  async deleteByUniquePairOfIds(noteId, tagId) {
    const sql = `DELETE FROM NotesTags WHERE Notes_id = ${noteId} AND Tags_id = ${tagId}`;
    return await this.database.runAsync(sql);
  }

}


module.exports = { NotesTagsModel };
