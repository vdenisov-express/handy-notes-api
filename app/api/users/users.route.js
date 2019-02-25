const usersRoute = require('express').Router();
const usersController = require('./users.controller');

const usersMiddleware = require('@api/users/middleware');


/* BASE CRUD */

// CREATE
usersRoute.post('/',
  usersMiddleware.validateCreation,
  usersController.create
);

// READ
usersRoute.get('/',
  usersController.getAll
);

// READ
usersRoute.get('/:id',
  usersMiddleware.checkId,
  usersController.getById
);

// UPDATE
usersRoute.patch('/:id',
  usersMiddleware.checkId,
  usersMiddleware.validateUpdating,
  usersController.updateById
);

// DELETE
usersRoute.delete('/:id',
  usersMiddleware.checkId,
  usersController.deleteById
);

// ##################################################

/* ADDITIONAL FUNCTIONALITY */

// add like to note
usersRoute.post('/:id/likes',
  usersMiddleware.checkId,
  usersController.addLikeToNote
);

// get notes for user
usersRoute.get('/:id/notes',
  usersMiddleware.checkId,
  usersController.getNotes
);

// get notes that user likes
usersRoute.get('/:id/likes',
  usersMiddleware.checkId,
  usersController.getLikedNotes
);

// remove like from note
usersRoute.delete('/:id/likes',
  usersMiddleware.checkId,
  usersController.removeLikeFromNote
);

// ##################################################


module.exports = { usersRoute };
