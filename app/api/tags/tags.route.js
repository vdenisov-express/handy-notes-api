const tagsRoute = require('express').Router();

const tagsMiddleware = require('./tags.middleware');
const tagsController = require('./tags.controller');

/* BASE CRUD */

// CREATE
tagsRoute.post('/',
  tagsController.create
);

// READ
tagsRoute.get('/',
  tagsController.getAll
);

// READ
tagsRoute.get('/:id',
  tagsMiddleware.checkId,
  tagsController.getById
);

// UPDATE
tagsRoute.patch('/:id',
  tagsMiddleware.checkId,
  tagsController.updateById
);

// DELETE
tagsRoute.delete('/:id',
  tagsMiddleware.checkId,
  tagsController.deleteById
);

tagsRoute.delete('/',
  tagsController.deleteAll
);

// ##################################################

/* ADDITIONAL FUNCTIONALITY */

// get notes that was marked with this tag
tagsRoute.get('/:id/notes',
  tagsMiddleware.checkId,
  tagsController.getTaggedNotes
);

// ##################################################

module.exports = { tagsRoute };
