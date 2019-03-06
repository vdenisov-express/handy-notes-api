const { assert } = require('chai');
const supertest = require('supertest');


const request = supertest('http://localhost:3000');

it('GET / should return status 404', (done) => {
  request
    .get('/')
    .end((err, res) => {
      assert.equal(res.status, 404);
      assert.typeOf(res.text, 'string');
      assert.equal(res.text, '404 - Not Found :(');
      done(err);
    });
});

it('GET /api/v1 should return status 200', (done) => {
  request
    .get('/api/v1')
    .end((err, res) => {
      assert.equal(res.status, 200);
      assert.typeOf(res.text, 'string');
      assert.equal(res.text, 'Welcome to API v1 !!!');
      done(err);
    });
});

it('GET /abcdefg should return status 404', (done) => {
  request
    .get('/abcdefghijk')
    .end((err, res) => {
      assert.equal(res.status, 404);
      assert.typeOf(res.text, 'string');
      assert.equal(res.text, '404 - Not Found :(');
      done(err);
    });
});
