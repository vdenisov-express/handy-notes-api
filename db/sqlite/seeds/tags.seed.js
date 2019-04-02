const Promise = require('bluebird');

const { Factory } = require('rosie');
const { LoremIpsum } = require('lorem-ipsum');

const lorem = new LoremIpsum();

Factory.define('Tag')
  // attributes
  .attr('value', () => `${
    lorem.generateWords(1).toUpperCase()
  }-${
    lorem.generateWords(1).toUpperCase()
  }`
  );

module.exports.apply = (apiLink, tagsTotal) => {
  console.log('\n ##### Tags seeds ##### \n');
  let counter = 0;

  // ITERATOR for Tags
  const tagsIndexes = Array.from(new Array(tagsTotal), (val, index) => index + 1);

  return Promise.each(tagsIndexes, (tagIndex) => {
    const newTag = Factory.build('Tag');

    return apiLink.post(`/tags`).send(newTag).then((res) => {
      const { tag } = res.body.data;
      console.log(`# {${++counter}} TAGS # [creation] => <${res.status}> Tags_id(${tag.id}) Tags_value("${tag.value}")`);
    });
  });
};

// // ============
// // old sql seed
// // ============
// module.exports.applyTo = (db) => {
//   return db.run(`
//     INSERT INTO Tags
//       (value)
//     VALUES
//       ("music"),
//       ("sport"),
//       ("javascript"),
//       ("netflix"),
//       ("sleep");
//   `);
// }
