const { Factory } = require('rosie');
const { LoremIpsum } = require('lorem-ipsum');

const supertest = require('supertest');
const apiLink = supertest('http://localhost:3000/api/v1');

const lorem = new LoremIpsum({
  sentencesPerParagraph: { min: 4, max: 8 },
  wordsPerSentence: { min: 4, max: 16 }
});


Factory.define('Note')
  .sequence('id')
  .option('defaultTitle', 'ABC')
  .option('defaultText', 'abcdefghijklmnopqrstuvwxyz')
  // attributes
  .attr('title', () => lorem.generateWords(2))
  .attr('text', () => lorem.generateSentences(3));


module.exports.applyTo = (db) => {

  console.log('\n ##### Notes seeds ##### \n');
  const usersTotal = 4;
  const notesForEachUser = 2;

  for (let i = 0; i < usersTotal; i++) {
    console.log(`--- user #${i+1} ---`);

    for (let j = 0; j < notesForEachUser; j++) {
      const newNote = Factory.build('Note');
      delete newNote.id;

      console.log('newNote =>', newNote);
    }

    // TODO: i need to create profile in "Mongo" and "Redis" after user register
  }

}


// // ============
// // old sql seed
// // ============
// module.exports.applyTo = (db) => {
//   return db.run(`
//     INSERT INTO Notes
//       (Users_id,    title,      text)
//     VALUES
//       (1,           "note-A",   "aaaaaaaaaa"),
//       (1,           "note-B",   "bbbbbbbbbb"),

//       (2,           "note-C",   "cccccccccc"),
//       (2,           "note-D",   "dddddddddd"),

//       (3,           "note-E",   "eeeeeeeeee"),
//       (3,           "note-F",   "ffffffffff"),

//       (4,           "note-G",   "gggggggggg"),
//       (4,           "note-H",   "hhhhhhhhhh");
//   `);
// }
