const { db } = require('./../sqlite.init');

const seedsForUsers = require('./users.seed');
const seedsForNotes = require('./notes.seed');
const seedsForTags = require('./tags.seed');

const seedsForLikes = require('./likes.seed');
const seedsForNotesTags = require('./notes-tags.seed');


seedsForUsers.applyTo(db);
// seedsForNotes.applyTo(db);
// seedsForTags.applyTo(db);

// seedsForLikes.applyTo(db);
// seedsForNotesTags.applyTo(db);
