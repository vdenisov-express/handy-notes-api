const notesRoute = require('express').Router();
const notesController = require('./notes.controller');


// CREATE
notesRoute.post('/',      notesController.create);

// READ
notesRoute.get('/',       notesController.getAll);
notesRoute.get('/:id',    notesController.getById);

// UPDATE
notesRoute.patch('/:id',  notesController.updateById);

// DELETE
notesRoute.delete('/:id', notesController.deleteById);


module.exports = { notesRoute };
