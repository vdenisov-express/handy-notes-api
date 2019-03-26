const { AbstractModel } = require('./abstract.model');

class TagsModel extends AbstractModel {
  constructor (db) {
    super(db, 'Tags');
  }
}

module.exports = { TagsModel };
