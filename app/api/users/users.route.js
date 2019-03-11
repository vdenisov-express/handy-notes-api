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


usersRoute.get('/:id/redis-test',
  usersMiddleware.checkId,
  usersController.redisTest
);


// ##################################################


module.exports = { usersRoute };
