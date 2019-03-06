const { db } = require('@database/initialize');
const { AbstractModel } = require('@shared/models');


class TagsModel extends AbstractModel {

  constructor() {
    super(db, 'Tags');
  }

}


module.exports = { TagsModel };
