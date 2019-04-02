const Promise = require('bluebird');

module.exports.apply = (apiLink, mockLikes) => {
  console.log('\n ##### Likes seeds ##### \n');
  let counter = 0;

  return Promise.each(mockLikes, async (mockLike) => {
    const { noteId, usersIds } = mockLike;
    console.log(`\n---> note (${noteId})\n`);

    return Promise.each(usersIds, (userId) => {
      return apiLink.post(`/notes/${noteId}/likes`).send({ userId }).then((res) => {
        console.log(`@+§ {${++counter}} LIKES => <${res.status}> Notes_id(${noteId}) Users_id(${userId})`);
      });
    });
  });
};

// // ============
// // old sql seed
// // ============
// module.exports.applyTo = (db) => {
//   return db.run(`
//     INSERT INTO Likes
//       (Users_id,  Notes_id)
//     VALUES
//       (1,         1),
//       (1,         3),
//       (1,         5),
//       (1,         7),

//       (2,         2),
//       (2,         6),
//       (2,         8),

//       (3,         5),
//       (3,         6),

//       (4,         1),
//       (4,         2),
//       (4,         5),
//       (4,         6);
//   `);
// }
