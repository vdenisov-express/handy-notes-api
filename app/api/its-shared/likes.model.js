const { db } = require('./../../../db/initialize');
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

  async deleteByUniquePairOfIds(userId, noteId) {
    const sql = `DELETE FROM Likes WHERE Users_id = ${userId} AND Notes_id = ${noteId}`;
    return await db.runAsync(sql);
  }

}


module.exports = { LikesModel };
