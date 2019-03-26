const handlerFor = require('./../../../shared/handlers');

const { db } = require('@db-sqlite/sqlite.init');
const { TagsModel } = require('./../../../../db/sqlite/models');


const tableTags = new TagsModel(db);


module.exports = (req, res, next) => {

  const searchId = parseInt(req.params.id);

  if (isNaN(searchId)) {
    return handlerFor.ERROR_ON_VALIDATION(res, 'this `id` is invalid !');
  }

  tableTags
    .checkId(req.params.id)

    .then(tagObj => {
      if (tagObj) {
        req.params.id = searchId;
        next();
      }

      else {
        return handlerFor.ERROR_NOT_FOUND(res, 'tag with this `id` not found !');
      }
    })

    .catch(err => handlerFor.ERROR_ON_DATABASE(res, err));

}
