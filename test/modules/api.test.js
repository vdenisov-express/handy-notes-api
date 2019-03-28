const { describe } = require('mocha');

describe(`\n### AUTH ###\n`, () => { require('./../../app/api/auth/auth.test'); });

describe(`\n### USERS ###\n`, () => { require('./../../app/api/users/users.test'); });

describe.only(`\n### NOTES ###\n`, () => { require('./../../app/api/notes/notes.test'); });

describe(`\n### TAGS ###\n`, () => { require('./../../app/api/tags/test/tags.test'); });
