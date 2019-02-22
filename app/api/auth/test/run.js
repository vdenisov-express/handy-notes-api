const chai = require('chai');
const supertest = require('supertest');


const apiLink = supertest('http://localhost:3000/api/v1');
const mockAuth = require('./mock.json').Auth;

const globalStorage = {
  token: null,
};


describe('Auth', () => {

  it('POST /auth/register => should register new user', (done) => {
    apiLink
      .post(`/auth/register`)
      .send(mockAuth.dataForRegister)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('user is registered !');
        done(err);
      });
  });

  it('POST /auth/login => should login existing user', (done) => {
    apiLink
      .post(`/auth/login`)
      .send(mockAuth.dataForLogin)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');

        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('user is logged in !');

        chai.expect(res.body).to.have.property('data');
        chai.expect(res.body.data).to.have.property('token');
        chai.expect(res.body.data.token).to.be.a('string');

        // save token to object "globalStorage"
        globalStorage.token = res.body.data.token;
        done(err);
      });
  });

});


describe('Token', () => {

  it('GET /auth/testJWT [without token] => should error `Unauthorized`', (done) => {
    apiLink
      .get(`/auth/testJWT`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(401, 'res.status');
        chai.expect(res).to.have.property('text');
        chai.expect(res.text).to.equal('Unauthorized');
        done(err);
      });
  });

  it('GET /auth/testJWT [wrong token] => should error `Unauthorized`', (done) => {
    apiLink
      .get(`/auth/testJWT`)
      .set({ Authorization: 'it_is_a_wrong_token' })
      .end((err, res)  => {
        chai.expect(res.status).to.equal(401, 'res.status');
        chai.expect(res).to.have.property('text');
        chai.expect(res.text).to.equal('Unauthorized');
        done(err);
      });
  });

  it('GET /auth/testJWT [correct token] => should return message `All is okay ;)`', (done) => {
    apiLink
      .get(`/auth/testJWT`)
      .set({ Authorization: globalStorage.token })
      .end((err, res)  => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res).to.have.property('text');
        chai.expect(res.text).to.equal('All is okay ;)');
        done(err);
      });
  });

});


describe('< delete useless data >', () => {

  it('=> delete useless user', (done) => {
    apiLink
      .delete(`/users/${ mockAuth.userId }`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('user is deleted !');
        done(err);
      });
  });

});
