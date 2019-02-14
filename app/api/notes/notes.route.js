const notesRoute = require('express').Router();
const notesController = require('./notes.controller');


/* BASE CRUD */

// CREATE
notesRoute.post('/',      notesController.create);

// READ
notesRoute.get('/',       notesController.getAll);
notesRoute.get('/:id',    notesController.getById);

// UPDATE
notesRoute.patch('/:id',  notesController.updateById);

// DELETE
notesRoute.delete('/:id', notesController.deleteById);

// ##################################################

/* ADDITIONAL FUNCTIONALITY */

// attach tag to note
notesRoute.post('/:id/tags',    notesController.attachTag);

// detach tag from note
notesRoute.delete('/:id/tags',  notesController.detachTag);


module.exports = { notesRoute };
