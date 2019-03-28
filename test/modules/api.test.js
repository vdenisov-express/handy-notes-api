const { describe } = require('mocha');

describe(`\n### AUTH ###\n`, () => { require('./../../app/api/auth/auth.test'); });

describe(`\n### USERS ###\n`, () => { require('./../../app/api/users/users.test'); });

describe(`\n### NOTES ###\n`, () => { require('./../../app/api/notes/notes.test'); });

describe.only(`\n### TAGS ###\n`, () => { require('./../../app/api/tags/tags.test'); });
