const chai = require('chai');
const supertest = require('supertest');


const request = supertest('http://localhost:3000');


describe('>>> SERVER <<<', () => {

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


describe.only('>>> API v1 <<<', () => {

  describe.only(`
  #########
  # USERS #
  #########
  `, () => {
    require('./../app/api/users/users.test');
  });

  describe(`
  #########
  # NOTES #
  #########
  `, () => {
    require('./notes.test');
  });

  describe(`
  ########
  # TAGS #
  ########
  `, () => {
    require('./tags.test');
  });

});
