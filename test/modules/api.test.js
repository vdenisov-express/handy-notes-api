const { describe } = require('mocha');

describe(`\n### AUTH ###\n`, () => { require('./../../app/api/auth/auth.test'); });

describe.only(`\n### USERS ###\n`, () => { require('./../../app/api/users/users.test'); });

describe(`\n### NOTES ###\n`, () => { require('./../../app/api/notes/test/notes.test'); });

describe(`\n### TAGS ###\n`, () => { require('./../../app/api/tags/test/tags.test'); });
