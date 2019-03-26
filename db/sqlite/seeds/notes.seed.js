const Promise = require('bluebird');

const { Factory } = require('rosie');
const { LoremIpsum } = require('lorem-ipsum');

const lorem = new LoremIpsum({
  wordsPerSentence: { min: 4, max: 16 }
});

Factory.define('Note')
  // attributes
  .attr('userId', 0)
  .attr('title', () => lorem.generateWords(3).toLowerCase())
  .attr('text', () => lorem.generateSentences(3));

module.exports.apply = (apiLink, usersTotal, notesForEachUser) => {
  console.log('\n ##### Notes seeds ##### \n');
  let counter = 0;

  // ITERATOR for Users
  const usersIndexes = Array.from(new Array(usersTotal), (val, index) => index + 1);

  // ITERATOR for Notes
  const notesIndexes = Array.from(new Array(notesForEachUser), (val, index) => index + 1);

  return Promise.each(usersIndexes, (userIndex) => {
    console.log(`\n---> user (${userIndex})\n`);

    return Promise.each(notesIndexes, (noteIndex) => {
      const newNote = Factory.build('Note', { userId: userIndex });

      return apiLink.post(`/notes`).send(newNote).then((res) => {
        const { note } = res.body.data;
        console.log(`§ {${++counter}} NOTES § [creation] => <${res.status}> Users_id(${note.Users_id}) Notes_id(${note.id}) Notes_title("${note.title}")`);
      });
    });
  });
};

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
