const { db } = require('@db-sqlite/sqlite.init');
const { AbstractModel } = require('./../../../db/sqlite/models');


class TagsModel extends AbstractModel {

  constructor() {
    super(db, 'Tags');
  }

}


module.exports = { TagsModel };
