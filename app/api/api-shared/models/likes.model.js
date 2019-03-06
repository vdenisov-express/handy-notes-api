const { db } = require('@database/initialize');
const { AbstractModel } = require('./abstract.model');


class LikesModel extends AbstractModel {

  constructor() {
    super(db, 'Likes');
  }

  async filterNotesByLikedCondition(userId) {
    const sql =  `SELECT Notes.* FROM Likes
                  INNER JOIN Notes ON Likes.Notes_id = Notes.id
                  WHERE Likes.Users_id = ${userId}`;
    return await db.allAsync(sql);
  }

  async filterUsersByIdOfLikedNote(noteId) {
    const sql =  `SELECT Users.* FROM Likes
                  INNER JOIN Users ON Likes.Users_id = Users.id
                  WHERE Likes.Notes_id = ${noteId}`;
    return await db.allAsync(sql);
  }

  async deleteByUniquePairOfIds(userId, noteId) {
    const sql = `DELETE FROM Likes WHERE Users_id = ${userId} AND Notes_id = ${noteId}`;
    return await db.runAsync(sql);
  }

}


module.exports = { LikesModel };
