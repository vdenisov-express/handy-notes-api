const { describe } = require('mocha');

describe('RUN TESTS', () => {
  describe('\n@@@ PART 1 => SERVER @@@\n', () => { require('./modules/server.test'); });

  describe('\n@@@ PART 2 => SITE @@@\n', () => { require('./modules/site.test'); });

  describe.only('\n@@@ PART 3 => API @@@\n', () => { require('./modules/api.test'); });
});
