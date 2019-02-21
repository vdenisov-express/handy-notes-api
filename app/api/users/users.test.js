const chai = require('chai');
const supertest = require('supertest');


const apiLink = supertest('http://localhost:3000/api/v1');
const mockUsers = {
  id: 1,

  dataForCreating: {
    name: 'Junior Tester',
    email: 'test@gmail.com',
    password: 'idontknow',
    phone: '+0-000-000-00-00',
    birthdate: '10.10.1010',
  },

  dataForUpdating: {
    name: 'Senior Tester',
  },
};


describe('Users:basic', () => {

  it('POST /users => should create new user', (done) => {
    apiLink
      .post(`/users`)
      .send(mockUsers.dataForCreating)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('user is created !');
        done(err);
      });
  });

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

  it('PATCH /users/:id => should update user with id === (:id)', (done) => {
    apiLink
      .patch(`/users/${ mockUsers.id }`)
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
