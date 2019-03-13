const { db } = require('@db-sqlite/sqlite.init');
const { AbstractModel } = require('./../../../db/sqlite/models');


class NotesModel extends AbstractModel {

  constructor() {
    super(db, 'Notes');
  }

  async filterByUserId(id) {
    const sql = `SELECT * FROM Notes WHERE Users_id = ${id}`;
    return await db.allAsync(sql);
  }

  async getSumLikesForNotesByUserId(userId) {
    const sql = `SELECT SUM(likes_count) FROM Notes WHERE Users_id = ${userId}`;
    return await db.getAsync(sql);
  }

  async getTagsForNotesByUserId(userId) {
    const sql = `
      SELECT DISTINCT Tags.* FROM Users
        INNER JOIN Notes ON Notes.Users_id = Users.id
        INNER JOIN NotesTags ON NotesTags.Notes_id = Notes.id
        INNER JOIN Tags ON Tags.id = NotesTags.Tags_id
      WHERE Users.id = ${userId} ORDER BY Tags.id ASC;
    `;
    return await db.allAsync(sql);
  }

  async getLimitedNumberOfLastUserNotes(userId, limit) {
    const sql = `SELECT * FROM Notes WHERE Users_id = ${userId} LIMIT ${limit}`;
    return await db.allAsync(sql);
  }

  async getTotalRatingAmongAllUsersByLikes() {
    const sql = `
      SELECT
        Users.id,
        Users.name,
        COUNT(Likes.RowID) as rating
      FROM
        Users
        INNER JOIN Notes ON Notes.Users_id = Users.id
        INNER JOIN Likes ON Likes.Notes_id = Notes.id
      GROUP BY Users.id
      ORDER BY rating DESC;
    `;
    return await db.allAsync(sql);
  }

}


module.exports = { NotesModel };
