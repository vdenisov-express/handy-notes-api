const Promise = require('bluebird');


module.exports.apply = (apiLink, mockNotesTags) => {

  console.log('\n ##### NotesTags seeds ##### \n');
  let counter = 0;
  let res = null;

  return Promise.each(mockNotesTags, async (mockNoteTag) => {
    const { noteId, tagsIds } = mockNoteTag;
    console.log(`\n---> note (${ noteId })\n`);

    // Step 1: get (id) of author of this note
    res = await apiLink.get(`/notes/${noteId}`)
    const { Users_id: userId } = res.body.data;
    // ---

    // Step 2: get (object) of author of this note
    res = await apiLink.get(`/users/${userId}`);
    const userObj = res.body.data;
    // ---

    // Step 3: authorize user for getting token
    const credentials = { email: userObj.email, password: 'qwerty123' };
    res = await apiLink.post(`/auth/login`).send(credentials);
    const { token: userToken } = res.body.data;
    // ---

    return Promise.each(tagsIds, (tagId) => {

      return apiLink.post(`/notes/${noteId}/tags`).set({ Authorization: userToken }).send({ tagId }).then((res) => {
        console.log(`§+# {${ ++counter }} NOTES-TAGS => <${ res.status }> Notes_id(${ noteId }) Tags_id(${ tagId })`);
      });

    });

  });

}


// // ============
// // old sql seed
// // ============
// module.exports.applyTo = (db) => {
//   return db.run(`
//     INSERT INTO NotesTags
//       (Notes_id,  Tags_id)
//     VALUES
//       (1,         4),
//       (1,         5),

//       (2,         3),
//       (2,         4),

//       (3,         1),
//       (3,         2),

//       (4,         1),
//       (4,         5),

//       (5,         3),
//       (5,         2),

//       (6,         1),
//       (6,         2),
//       (6,         3),

//       (7,         3),
//       (7,         4),
//       (7,         5),

//       (8,         1),
//       (8,         3),
//       (8,         5);
//   `);
// }
