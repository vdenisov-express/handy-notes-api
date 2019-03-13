const { db } = require('@db-sqlite/sqlite.init');
const { AbstractModel } = require('./abstract.model');


class TagsModel extends AbstractModel {

  constructor() {
    super(db, 'Tags');
  }

}


module.exports = { TagsModel };
