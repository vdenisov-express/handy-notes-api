const chai = require('chai');
const supertest = require('supertest');


const request = supertest('http://localhost:3000');


describe.skip('>>> SERVER <<<', () => {

  it('GET / should return status 404', (done) => {
    request
      .get('/')
      .end((err, res) => {
        chai.assert.equal(res.status, 404);
        chai.assert.typeOf(res.text, 'string');
        chai.assert.equal(res.text, '404 - Not Found :(');
        done(err);
      });
  });

  it('GET /api/v1 should return status 200', (done) => {
    request
      .get('/api/v1')
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.typeOf(res.text, 'string');
        chai.assert.equal(res.text, 'Welcome to API v1 !!!');
        done(err);
      });
  });

  it('GET /abcdefg should return status 404', (done) => {
    request
      .get('/abcdefghijk')
      .end((err, res) => {
        chai.assert.equal(res.status, 404);
        chai.assert.typeOf(res.text, 'string');
        chai.assert.equal(res.text, '404 - Not Found :(');
        done(err);
      });
  });

});


describe('>>> API v1 <<<', () => {

  describe.skip(`
  #########
  # USERS #
  #########
  `, () => {
    require('./users.test');
  });

  describe.skip(`
  #########
  # NOTES #
  #########
  `, () => {
    require('./notes.test');
  });

  describe.skip(`
  ########
  # TAGS #
  ########
  `, () => {
    require('./tags.test');
  });

});
