describe('RUN TESTS', () => {

  describe('\n@@@ PART 1 => SERVER @@@\n',  () => { require('./modules/server.test'); });

  describe('\n@@@ PART 2 => SITE @@@\n',    () => { require('./modules/site.test');   });

  describe('\n@@@ PART 3 => API v1 @@@\n',  () => { require('./modules/apiV1.test');  });

});
