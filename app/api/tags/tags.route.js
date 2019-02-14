const tagsRoute = require('express').Router();
const tagsController = require('./tags.controller');


// CREATE
tagsRoute.post('/',      tagsController.create);

// READ
tagsRoute.get('/',       tagsController.getAll);
tagsRoute.get('/:id',    tagsController.getById);

// UPDATE
tagsRoute.patch('/:id',  tagsController.updateById);

// DELETE
tagsRoute.delete('/:id', tagsController.deleteById);


module.exports = { tagsRoute };
