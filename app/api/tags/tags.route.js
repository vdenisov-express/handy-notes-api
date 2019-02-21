const tagsRoute = require('express').Router();
const tagsController = require('./tags.controller');


/* BASE CRUD */

// CREATE
tagsRoute.post('/',      tagsController.create);

// READ
tagsRoute.get('/',       tagsController.getAll);
tagsRoute.get('/:id',    tagsController.getById);

// UPDATE
tagsRoute.patch('/:id',  tagsController.updateById);

// DELETE
tagsRoute.delete('/:id', tagsController.deleteById);

// ##################################################

/* ADDITIONAL FUNCTIONALITY */

// get notes that was marked with this tag
tagsRoute.get('/:id/notes', tagsController.getTaggedNotes);

// ##################################################


module.exports = { tagsRoute };
