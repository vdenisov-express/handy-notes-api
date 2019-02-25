const notesRoute = require('express').Router();
const notesController = require('./notes.controller');

const notesMiddleware = require('@api/notes/middleware');


/* BASE CRUD */

// CREATE
notesRoute.post('/',      notesController.create);

// READ
notesRoute.get('/',       notesController.getAll);

// READ
notesRoute.get('/:id',
  notesMiddleware.checkId,
  notesController.getById
);

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

// get user who liked this note
notesRoute.get('/:id/likers',   notesController.getLikers);

// detach tag from note
notesRoute.delete('/:id/tags',  notesController.detachTag);

// ##################################################


module.exports = { notesRoute };
