const chai = require('chai');
const supertest = require('supertest');


const request = supertest('http://localhost:3000');

it('GET /home should return "Home" page', (done) => {
  request
    .get('/home')
    .end((err, res) => {
      chai.assert.equal(res.status, 200);
      chai.assert.equal(res.type, 'text/html');
      done(err);
    });
});

it('GET /features should return "Features" page', (done) => {
  request
    .get('/features')
    .end((err, res) => {
      chai.assert.equal(res.status, 200);
      chai.assert.equal(res.type, 'text/html');
      done(err);
    });
});

it('GET /news should return "News" page', (done) => {
  request
    .get('/news')
    .end((err, res) => {
      chai.assert.equal(res.status, 200);
      chai.assert.equal(res.type, 'text/html');
      done(err);
    });
});
