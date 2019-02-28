const handlerFor = require('@shared/handlers');
const { TagsModel } = require('@api/tags/tags.model');


const tableTags = new TagsModel();


module.exports = (req, res, next) => {

  const { id: searchId } = req.params;

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
