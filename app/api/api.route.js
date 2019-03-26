const apiV1 = require('express').Router();

const { authRoute } = require('./auth/auth.route');
const { usersRoute } = require('./users/users.route');
const { notesRoute } = require('./notes/notes.route');
const { tagsRoute } = require('./tags/tags.route');


apiV1.get('/', (req, res) => {
  res.status(200).send('Welcome to API v1 !!!');
});

apiV1.use('/auth',    authRoute);
apiV1.use('/users',   usersRoute);
apiV1.use('/notes',   notesRoute);
apiV1.use('/tags',    tagsRoute);


module.exports = { apiV1 };
