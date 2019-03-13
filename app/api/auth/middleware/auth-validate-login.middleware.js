const Joi = require('joi');
const handlerFor = require('./../../../shared/handlers');


const authLoginSchema = Joi.object().keys({

  email: Joi.string().required(),
  password: Joi.string().required(),

});


module.exports = (req, res, next) => {

  Joi.validate(req.body, authLoginSchema)
    .then(verified => next())
    .catch(err => handlerFor.ERROR_ON_VALIDATION(res, err));

}
