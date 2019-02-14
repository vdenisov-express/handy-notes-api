const { db } = require('./../../../db/initialize');
const { AbstractModel } = require('./../abstract.model');


class NotesTagsModel extends AbstractModel {

  constructor() {
    super(db, 'NotesTags');
  }

}


module.exports = { NotesTagsModel };
