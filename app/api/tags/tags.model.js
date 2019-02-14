const { db } = require('./../../../db/initialize');
const { AbstractModel } = require('./../its-shared/abstract.model');


class TagsModel extends AbstractModel {

  constructor() {
    super(db, 'Tags');
  }

}


module.exports = { TagsModel };
