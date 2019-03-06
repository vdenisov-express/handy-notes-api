const passport = require('passport');
const usersRoute = require('express').Router();
const usersController = require('./users.controller');

const usersMiddleware = require('@api/users/middleware');


/* BASE CRUD */

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
  passport.authenticate('jwt', {session: false}),
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

// get total likes for user
usersRoute.get('/:id/rating',
  usersMiddleware.checkId,
  usersController.getRating
);

// remove like from note
usersRoute.delete('/:id/likes',
  usersMiddleware.checkId,
  usersController.removeLikeFromNote
);

// ##################################################


module.exports = { usersRoute };
