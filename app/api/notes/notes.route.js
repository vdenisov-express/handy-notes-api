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

// get tags for note
notesRoute.get('/:id/tags',     notesController.getTags);

// filter notes by tag
notesRoute.get('/filter/by',    notesController.filterByTagId);

// detach tag from note
notesRoute.delete('/:id/tags',  notesController.detachTag);

// ##################################################


module.exports = { notesRoute };
