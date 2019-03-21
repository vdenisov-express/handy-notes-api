const passport = require('passport');
const usersRoute = require('express').Router();
const usersController = require('./users.controller');

const authMiddleware = require('./../auth/middleware');
const usersMiddleware = require('./../users/middleware');


/* BASE CRUD */

// READ
usersRoute.get('/',
  usersController.getAll
);

// MONGO {

// get all profiles
usersRoute.get('/profiles',
  usersController.mongoGetAllProfiles
);

// create user profile
usersRoute.post('/:id/profile',
  // usersMiddleware.checkId,
  usersController.mongoCreateProfile
);

// get user profile
usersRoute.get('/:id/profile',
  // usersMiddleware.checkId,
  usersController.mongoGetUserProfile
);

// update user profile
usersRoute.patch('/:id/profile',
  // usersMiddleware.checkId,
  usersController.mongoUpdateUserProfile
);

// delete user profile
usersRoute.delete('/:id/profile',
  // usersMiddleware.checkId,
  usersController.mongoRemoveUserProfile
);

// } MONGO

// READ
usersRoute.get('/:id',
  usersMiddleware.checkId,
  usersController.getById
);

// UPDATE
usersRoute.patch('/:id',
  usersMiddleware.checkId,
  passport.authenticate('jwt', {session: false}),
  authMiddleware.decodeToken,
  usersMiddleware.validateUpdating,
  usersController.updateById
);

// DELETE
usersRoute.delete('/:id',
  usersMiddleware.checkId,
  usersController.deleteById
);

usersRoute.delete('/',
  usersController.deleteAll
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

// REDIS {

// synchronize raiting for user [ Sqlite & Redis ]
usersRoute.post('/:id/redis-sync-sqlite',
  usersMiddleware.checkId,
  usersController.synchronizeRating
);

// compare raiting for user [ Sqlite vs Redis ]
usersRoute.get('/:id/redis-vs-sqlite',
  usersMiddleware.checkId,
  usersController.compareRating
);

// get total likes for user [ Redis ]
usersRoute.get('/:id/redis-rating',
  // usersMiddleware.checkId,
  usersController.getRating
);

// delete rating for user [ Redis ]
usersRoute.delete('/:id/redis-rating',
  // usersMiddleware.checkId,
  usersController.deleteUserRating
);

// } REDIS

// STATISTIC {

// get tags for all user notes
usersRoute.get('/:id/tags-for-notes',
  usersMiddleware.checkId,
  usersController.getTagsForNotes
);

// get last notes for user
usersRoute.get('/:id/last-notes',
  usersMiddleware.checkId,
  usersController.getLastNotes
);

// get rating among all users
usersRoute.get('/:id/total-rating',
  usersMiddleware.checkId,
  usersController.getTotalRating
);

// } STATISTIC

// ##################################################


module.exports = { usersRoute };
