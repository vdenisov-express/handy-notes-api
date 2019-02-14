const { db } = require('./../../../db/initialize');
const { AbstractModel } = require('./abstract.model');


class LikesModel extends AbstractModel {

  constructor() {
    super(db, 'Likes');
  }

  // filter users by like in note

  // filter notes by like from user

  async deleteByUniquePairOfIds(userId, noteId) {
    const sql = `DELETE FROM Likes WHERE Users_id = ${userId} AND Notes_id = ${noteId}`;
    return await db.runAsync(sql);
  }

}


module.exports = { LikesModel };
