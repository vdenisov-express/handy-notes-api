const chai = require('chai');
const supertest = require('supertest');


const apiLink = supertest('http://localhost:3000/api/v1');
const mockUsers = require('./users.mock.json');
const globalStorage = { token: null };


describe('< create needed data >', () => {

  it('=> register user (for creating notes)', (done) => {
    apiLink
      .post(`/auth/register`)
      .send(mockUsers.dataForRegister)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('user is registered !');
        done(err);
      });
  });

  it('=> login user (for getting token)', (done) => {
    apiLink
      .post(`/auth/login`)
      .send(mockUsers.dataForLogin)
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


describe('Users:basic', () => {

  it('GET /users => should return all users', (done) => {
    apiLink
      .get(`/users`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('data');
        chai.expect(res.body).to.have.property('total');
        done(err);
      });
  });

  it('GET /users/:id => should return user with id === (:id)', (done) => {
    apiLink
      .get(`/users/${ mockUsers.id }`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('data');
        done(err);
      });
  });

  it('(token) PATCH /users/:id => should update user with id === (:id)', (done) => {
    apiLink
      .patch(`/users/${ mockUsers.id }`)
      .set({ Authorization: globalStorage.token })
      .send(mockUsers.dataForUpdating)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('user is updated !');
        done(err);
      });
  });

  it('DELETE /users/:id => should delete user with id === (:id)', (done) => {
    apiLink
      .delete(`/users/${ mockUsers.id }`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('user is deleted !');
        done(err);
      });
  });

});
