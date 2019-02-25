const tagsRoute = require('express').Router();
const tagsController = require('./tags.controller');

const tagsMiddleware = require('@api/tags/middleware');


/* BASE CRUD */

// CREATE
tagsRoute.post('/',      tagsController.create);

// READ
tagsRoute.get('/',       tagsController.getAll);

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

// ##################################################

/* ADDITIONAL FUNCTIONALITY */

// get notes that was marked with this tag
tagsRoute.get('/:id/notes',
  tagsMiddleware.checkId,
  tagsController.getTaggedNotes
);

// ##################################################


module.exports = { tagsRoute };
