// const { db } = require('./../sqlite.init');

const Promise = require('bluebird');

const supertest = require('supertest');
const apiLink = supertest('http://localhost:3000/api/v1');

const resetUsers = require('./reset/users.reset');
const resetTags = require('./reset/tags.reset');

const seedsForUsers = require('./users.seed');
const seedsForNotes = require('./notes.seed');
const seedsForTags = require('./tags.seed');

const seedsForLikes = require('./likes.seed');
const seedsForNotesTags = require('./notes-tags.seed');


const usersTotal = 4;
const notesForEachUser = 2;
const tagsTotal = 5;


const runAll = async () => {

  await resetUsers.apply(apiLink, usersTotal);
  await resetTags.apply(apiLink, tagsTotal);

  await seedsForUsers.apply(apiLink, usersTotal);
  await seedsForNotes.apply(apiLink, usersTotal, notesForEachUser);
  await seedsForTags.apply(apiLink, tagsTotal);

}

runAll();


// seedsForLikes.applyTo(db);
// seedsForNotesTags.applyTo(db);
