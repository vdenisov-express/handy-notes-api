const { db } = require('./../../../db/initialize');
const { AbstractModel } = require('./../abstract.model');



class NotesModel extends AbstractModel {

  constructor() {
    super(db, 'Notes');
  }


}


module.exports = { NotesModel };
