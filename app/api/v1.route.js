const apiV1 = require('express').Router();

const { usersRoute } = require('./users/users.route');
const { notesRoute } = require('./notes/notes.route');


apiV1.get('/', (req, res) => {
  res.status(200).send('Welcome to API v1 !!!');
});

apiV1.use('/users', usersRoute);
apiV1.use('/notes', notesRoute);


module.exports = { apiV1 };
