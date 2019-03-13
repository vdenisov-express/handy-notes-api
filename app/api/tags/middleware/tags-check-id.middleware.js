const handlerFor = require('./../../api-shared/handlers');
const { TagsModel } = require('./../../../../db/sqlite/models');


const tableTags = new TagsModel();


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
