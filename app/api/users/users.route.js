const passport = require('passport');
const usersRoute = require('express').Router();
const usersController = require('./users.controller');

const usersMiddleware = require('./../users/middleware');


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

// compare raiting for user [ Sqlite vs Redis ]
usersRoute.get('/:id/redis-rating',
  usersMiddleware.checkId,
  usersController.compareRating
);

// synchronize raiting for user [ Sqlite & Redis ]
usersRoute.post('/:id/redis-rating',
  usersMiddleware.checkId,
  usersController.synchronizeRating
);

// ##################################################


module.exports = { usersRoute };
