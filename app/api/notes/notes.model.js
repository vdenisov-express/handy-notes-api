const { AbstractModel } = require('./../abstract.model');


class NotesModel extends AbstractModel {

  constructor() {
    super('Notes');
  }

}


module.exports = { NotesModel };
