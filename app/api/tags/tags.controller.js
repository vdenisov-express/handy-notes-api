const handlerFor = require('./../api-shared/handlers');

const { TagsModel } = require('./tags.model');


const tableTags = new TagsModel();


module.exports = {

  // CREATE

  create(req, res) {
    const reqBody = req.body;

    const inputData = {
      value:    `${ reqBody.value }`,
    };

    tableTags
      .create(inputData)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'tag is created !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // READ

  getAll(req, res) {
    tableTags
      .getAll()
      .then(tagsList => handlerFor.SUCCESS(res, 200, tagsList))
      .catch(err => handlerFor.ERROR(res, err));
  },

  getById(req, res) {
    const { id } = req.params;

    tableTags
      .getById(id)
      .then(tagObj => handlerFor.SUCCESS(res, 200, tagObj))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // UPDATE

  updateById(req, res) {
    const { id } = req.params;
    const reqBody = req.body;

    const inputData = reqBody;

    tableTags
      .updateById(id, inputData)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'tag is updated !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

  // DELETE

  deleteById(req, res) {
    const { id } = req.params;

    tableTags
      .deleteById(id)
      .then(() => handlerFor.SUCCESS(res, 200, null, 'tag is deleted !'))
      .catch(err => handlerFor.ERROR(res, err));
  },

}
