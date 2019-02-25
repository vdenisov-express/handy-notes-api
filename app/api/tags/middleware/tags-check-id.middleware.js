const handlerFor = require('@shared/handlers');
const { TagsModel } = require('@api/tags/tags.model');


const tableTags = new TagsModel();


module.exports = (req, res, next) => {

  tableTags
    .checkId(req.params.id)

    .then(tagObj => {
      tagObj ? next() : handlerFor.ERROR_NOT_FOUND(res, 'tag with this `id` not found !')
    })

    .catch(err => handlerFor.ERROR_ON_DATABASE(res, err));

}
