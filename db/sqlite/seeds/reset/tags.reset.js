const Promise = require('bluebird');

module.exports.apply = (apiLink, tagsTotal) => {
  console.log('\n ##### !!! RESET Tags !!! ##### \n');
  let counter = 0;

  // ITERATOR for Tags
  const tagsIndexes = Array.from(new Array(tagsTotal), (val, index) => index + 1);

  return Promise.each(tagsIndexes, (tagIndex) => {
    return apiLink.delete(`/tags/${tagIndex}`).then((res) => {
      console.log(`~ {${++counter}} RESET ~ [delete tag] => <${res.status}> ${res.body.message}`);
    });
  });
};
