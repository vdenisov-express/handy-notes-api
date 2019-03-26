const { expect } = require('chai');
const supertest = require('supertest');


const apiLink = supertest('http://localhost:3000/api/v1');
const mockUsers = require('./users.mock.json');
const globalStorage = { token: null };


describe('< create needed data >', () => {

  it('=> register user (for creating notes)', async () => {
    // execute query
    const res = await apiLink
      .post(`/auth/register`)
      .send(mockUsers.dataForRegister);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('user is registered !');
  });

  it('=> login user (for getting token)', async () => {
    // execute query
    const res = await apiLink
      .post(`/auth/login`)
      .send(mockUsers.dataForLogin);

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


describe('Users:basic', () => {

  it('GET /users => should return all users', async () => {
    // execute query
    const res = await apiLink
      .get(`/users`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('total');
  });

  it('GET /users/:id => should return user with id === (:id)', async () => {
    // execute query
    const res = await apiLink
      .get(`/users/${ mockUsers.id }`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('data');
  });

  it('(token) PATCH /users/:id => should update user with id === (:id)', async () => {
    // execute query
    const res = await apiLink
      .patch(`/users/${ mockUsers.id }`)
      .set({ Authorization: globalStorage.token })
      .send(mockUsers.dataForUpdating);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('user is updated !');
  });

  it('DELETE /users/:id => should delete user with id === (:id)', async () => {
    // execute query
    const res = await apiLink
      .delete(`/users/${ mockUsers.id }`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('user is deleted !');
  });

});
