const { AbstractModel } = require('./abstract.model');

class NotesModel extends AbstractModel {
  constructor (db) {
    super(db, 'Notes');
  }

  async filterByUserId (id) {
    const sql = `SELECT * FROM Notes WHERE Users_id = ${id}`;
    return this.database.allAsync(sql);
  }

  async getSumLikesForNotesByUserId (userId) {
    const sql = `SELECT SUM(likes_count) AS "rating" FROM Notes WHERE Users_id = ${userId}`;
    return this.database.getAsync(sql);
  }

  async getTagsForNotesByUserId (userId) {
    const sql = `
      SELECT DISTINCT Tags.* FROM Notes
        INNER JOIN NotesTags ON NotesTags.Notes_id = Notes.id
        INNER JOIN Tags ON Tags.id = NotesTags.Tags_id
      WHERE Notes.Users_id = ${userId} ORDER BY Tags.id ASC;
    `;

    return this.database.allAsync(sql);
  }

  async getLimitedNumberOfLastUserNotes (userId, limit) {
    const sql = `SELECT * FROM Notes WHERE Users_id = ${userId} LIMIT ${limit}`;
    return this.database.allAsync(sql);
  }

  async getTotalRatingAmongAllUsersByLikes () {
    const sql = `
      SELECT
        Users.id,
        Users.name,
        COUNT(Likes.RowID) AS "rating"
      FROM
        Users
        INNER JOIN Notes ON Notes.Users_id = Users.id
        INNER JOIN Likes ON Likes.Notes_id = Notes.id
      GROUP BY Users.id
      ORDER BY "rating" DESC;
    `;
    return this.database.allAsync(sql);
  }
}

module.exports = { NotesModel };
