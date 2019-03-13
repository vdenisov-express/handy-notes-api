const Joi = require('joi');
const handlerFor = require('./../../api-shared/handlers');


const usersUpdateSchema = Joi.object().keys({

  name: Joi.string().alphanum().min(3).max(30),

  phone: Joi.string().regex(/^(8-?|\+?7-?)?(\(?\d{3}\)?)-?(\d-?){6}\d$/),
  // copied from http://regexlib.com/REDetails.aspx?regexp_id=3923

  birthdate: Joi.string().regex(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/),
  // copied from https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy#answer-26972181
  // copied from https://regexr.com/39tr1

});


module.exports = (req, res, next) => {

  Joi.validate(req.body, usersUpdateSchema)
    .then(verified => next())
    .catch(err => handlerFor.ERROR_ON_VALIDATION(res, err));

}
