const { describe, it } = require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');

const apiLink = supertest('http://localhost:3000/api/v1');
const mockAuth = require('./auth.mock.json');

const globalStorage = {
  token: null
};

describe('Auth', () => {
  it('POST /auth/register => should register new user', async () => {
    // execute query
    const res = await apiLink
      .post(`/auth/register`)
      .send(mockAuth.dataForRegister);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('user is registered !');
  });

  it('POST /auth/login => should login existing user', async () => {
    // execute query
    const res = await apiLink
      .post(`/auth/login`)
      .send(mockAuth.dataForLogin);

    // check response
    expect(res.status).to.equal(200, 'res.status');

    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('user is logged in !');

    expect(res.body).to.have.property('data');
    expect(res.body.data).to.have.property('token');
    expect(res.body.data.token).to.be.a('string');

    // save token to object "globalStorage"
    globalStorage.token = res.body.data.token;
  });
});

describe('Token', () => {
  it('GET /auth/testJWT [without token] => should error `Unauthorized`', async () => {
    // execute query
    const res = await apiLink
      .get(`/auth/testJWT`);

    // check response
    expect(res.status).to.equal(401, 'res.status');
    expect(res).to.have.property('text');
    expect(res.text).to.equal('Unauthorized');
  });

  it('GET /auth/testJWT [wrong token] => should error `Unauthorized`', async () => {
    // execute query
    const res = await apiLink
      .get(`/auth/testJWT`)
      .set({ Authorization: 'it_is_a_wrong_token' });

    // check response
    expect(res.status).to.equal(401, 'res.status');
    expect(res).to.have.property('text');
    expect(res.text).to.equal('Unauthorized');
  });

  it('GET /auth/testJWT [correct token] => should return message `All is okay ;)`', async () => {
    // execute query
    const res = await apiLink
      .get(`/auth/testJWT`)
      .set({ Authorization: globalStorage.token });

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res).to.have.property('text');
    expect(res.text).to.equal('All is okay ;)');
  });
});

describe('< delete useless data >', () => {
  it('=> delete useless user', async () => {
    // execute query
    const res = await apiLink
      .delete(`/users/${mockAuth.userId}`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('user is deleted !');
  });
});
