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

// add like to note
usersRoute.post('/:id/likes',   usersController.addLikeToNote);

// get notes for user
usersRoute.get('/:id/notes',    usersController.getNotes);

// remove like from note
usersRoute.delete('/:id/likes', usersController.removeLikeFromNote);


module.exports = { usersRoute };
