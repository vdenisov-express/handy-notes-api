const usersRoute = require('express').Router();
const usersController = require('./users.controller');

/* BASE CRUD */

// CREATE
usersRoute.post('/',      usersController.create);
// READ
usersRoute.get('/',       usersController.getAll);
usersRoute.get('/:id',    usersController.getById);
// UPDATE
usersRoute.patch('/:id',  usersController.updateById);
// DELETE
usersRoute.delete('/:id', usersController.deleteById);

// ##################################################

/* ADDITIONAL FUNCTIONALITY */

// get user's notes
usersRoute.get('/:id/notes',  usersController.getNotes)


module.exports = { usersRoute };
