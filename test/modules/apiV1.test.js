const { describe } = require('mocha');

describe(`\n### AUTH ###\n`, () => { require('./../../app/api/auth/test/auth.test'); });

describe(`\n### USERS ###\n`, () => { require('./../../app/api/users/test/users.test'); });

describe(`\n### NOTES ###\n`, () => { require('./../../app/api/notes/test/notes.test'); });

describe(`\n### TAGS ###\n`, () => { require('./../../app/api/tags/test/tags.test'); });
