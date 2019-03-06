const handlerFor = require('@shared/handlers');

const { TagsModel } = require('./tags.model');
const { NotesTagsModel } = require('@shared/models');


const tableTags = new TagsModel();
const tableNotesTags = new NotesTagsModel();


module.exports = {

  // CREATE

  async create(req, res) {
    const reqBody = req.body;

    const inputData = {
      value:    `${ reqBody.value }`,
    };

    try {
      await tableTags.create(inputData);
      return handlerFor.SUCCESS(res, 200, null, 'tag is created !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // READ

  async getAll(req, res) {
    try {
      const tagsList = await tableTags.getAll();
      return handlerFor.SUCCESS(res, 200, tagsList);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  async getById(req, res) {
    const { id } = req.params;

    try {
      const tagObj = await tableTags.getById(id);
      return handlerFor.SUCCESS(res, 200, tagObj);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // UPDATE

  async updateById(req, res) {
    const { id } = req.params;
    const reqBody = req.body;

    const inputData = reqBody;

    try {
      await tableTags.updateById(id, inputData);
      return handlerFor.SUCCESS(res, 200, null, 'tag is updated !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // DELETE

  async deleteById(req, res) {
    const { id } = req.params;

    try {
      await tableTags.deleteById(id);
      return handlerFor.SUCCESS(res, 200, null, 'tag is deleted !');
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

  // ##################################################

  // get notes that was marked with this tag
  async getTaggedNotes(req, res) {
    const { id } = req.params;

    try {
      const notesList = await tableNotesTags.filterNotesByTagId(id);
      return handlerFor.SUCCESS(res, 200, notesList);
    } catch (err) {
        return handlerFor.ERROR(res, err);
    }
  },

}
