const path = require('path');
const Promise = require('bluebird');
const sqlite3 = require('sqlite3').verbose();

const config = require('config');
const DB_CONFIG = config.get('DATABASE');

const db = Promise.promisifyAll(
  new sqlite3.Database(
    path.join(__dirname, DB_CONFIG.PATH)
  )
);

console.log(`* database => use "${DB_CONFIG.PATH}"`);

db.serialize(() => {
  // Enforced setting flag "foreign_keys"
  db.run('PRAGMA foreign_keys = ON');
  // https://www.sqlite.org/pragma.html
  // Changing the foreign_keys setting affects the execution of all statements prepared using the database connection, including those prepared before the setting was changed.
  // To minimize future problems, applications should set the foreign key enforcement flag as required by the application and not depend on the default setting.

  db.get('PRAGMA foreign_keys', (err, res) => {
    if (err) throw err;
    // console.log('Default PRAGMA "foreign_keys" switched to', res.foreign_keys);
    console.log(`* database => foreign key links activated`);
  });
});


module.exports = { db };
