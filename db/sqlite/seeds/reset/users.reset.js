const Promise = require('bluebird');


module.exports.apply = (apiLink, usersTotal) => {

  console.log('\n ##### !!! RESET Users !!! ##### \n');
  let counter = 0;

  // ITERATOR for Users
  const usersIndexes = Array.from( new Array(usersTotal), (val,index)=>index+1 );

  return Promise.each(usersIndexes, (userIndex) => {
    return apiLink.delete(`/users/${userIndex}`).then((res) => {
      console.log(`~ {${ ++counter }} RESET ~ [delete user] => <${ res.status }> ${ res.body.message }`);
    });
  });

}
