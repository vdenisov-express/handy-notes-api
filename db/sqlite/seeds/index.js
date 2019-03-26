const supertest = require('supertest');

const resetUsers = require('./reset/users.reset');
const resetTags = require('./reset/tags.reset');

const seedsForUsers = require('./users.seed');
const seedsForNotes = require('./notes.seed');
const seedsForTags = require('./tags.seed');

const seedsForNotesTags = require('./notes-tags.seed');
const seedsForLikes = require('./likes.seed');

const apiLink = supertest('http://localhost:3000/api/v1');

const mocks = {
  usersTotal: 4,
  notesForEachUser: 2,
  tagsTotal: 5,

  dataNotesTags: [
    { noteId: 1, tagsIds: [ 4, 5 ] },
    { noteId: 2, tagsIds: [ 3, 4 ] },
    { noteId: 3, tagsIds: [ 1, 2 ] },
    { noteId: 4, tagsIds: [ 1, 5 ] },
    { noteId: 5, tagsIds: [ 3, 2 ] },
    { noteId: 6, tagsIds: [ 1, 2, 3 ] },
    { noteId: 7, tagsIds: [ 3, 4, 5 ] },
    { noteId: 8, tagsIds: [ 1, 3, 5 ] }
  ],

  dataLikes: [
    { noteId: 1, usersIds: [ 1, 4 ] },
    { noteId: 2, usersIds: [ 2, 4 ] },
    { noteId: 3, usersIds: [ 1 ] },
    { noteId: 4, usersIds: [] },
    { noteId: 5, usersIds: [ 1, 3, 4 ] },
    { noteId: 6, usersIds: [ 2, 3, 4 ] },
    { noteId: 7, usersIds: [ 1 ] },
    { noteId: 8, usersIds: [ 2 ] }
  ]
};

const runAll = async () => {
  await resetUsers.apply(apiLink, mocks.usersTotal);
  await resetTags.apply(apiLink, mocks.tagsTotal);

  await seedsForUsers.apply(apiLink, mocks.usersTotal);
  await seedsForNotes.apply(apiLink, mocks.usersTotal, mocks.notesForEachUser);
  await seedsForTags.apply(apiLink, mocks.tagsTotal);

  await seedsForNotesTags.apply(apiLink, mocks.dataNotesTags);
  await seedsForLikes.apply(apiLink, mocks.dataLikes);
};

runAll();
