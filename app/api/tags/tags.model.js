const { AbstractModel } = require('./../abstract.model');


class TagsModel extends AbstractModel {

  constructor() {
    super('Tags');
  }

}


module.exports = { TagsModel };
