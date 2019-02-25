const { db } = require('./../../../db/initialize');
const { AbstractModel } = require('./../api-shared/models');


class TagsModel extends AbstractModel {

  constructor() {
    super(db, 'Tags');
  }

}


module.exports = { TagsModel };
