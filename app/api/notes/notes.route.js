const passport = require('passport');
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
notesRoute.patch('/:id',
  notesMiddleware.checkId,
  passport.authenticate('jwt', {session: false}),
  notesController.updateById
);

// DELETE
notesRoute.delete('/:id',
  notesMiddleware.checkId,
  notesController.deleteById
);

// ##################################################

/* NOTES => LIKES */

// add like to note
notesRoute.post('/:id/likes',
  notesMiddleware.checkId,
  notesController.addLikeToNote
);

// remove like from note
notesRoute.delete('/:id/likes',
  notesMiddleware.checkId,
  notesController.removeLikeFromNote
);

// ##################################################

/* NOTES => TAGS */

// attach tag to note
notesRoute.post('/:id/tags',
  notesMiddleware.checkId,
  passport.authenticate('jwt', {session: false}),
  notesController.attachTag
);

// get tags for note
notesRoute.get('/:id/tags',
  notesMiddleware.checkId,
  notesController.getTags
);

// get user who liked this note
notesRoute.get('/:id/likers',
  notesMiddleware.checkId,
  notesController.getLikers
);

// detach tag from note
notesRoute.delete('/:id/tags',
  notesMiddleware.checkId,
  passport.authenticate('jwt', {session: false}),
  notesController.detachTag
);

// ##################################################


module.exports = { notesRoute };
