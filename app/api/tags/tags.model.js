const { db } = require('@database/initialize');
const { AbstractModel } = require('@api/api-shared/models');


class TagsModel extends AbstractModel {

  constructor() {
    super(db, 'Tags');
  }

}


module.exports = { TagsModel };
