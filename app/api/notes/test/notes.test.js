const chai = require('chai');
const supertest = require('supertest');


const apiLink = supertest('http://localhost:3000/api/v1');
const mockUsers = require('./../../users/test/users.mock.json');
const mockNotes = require('./notes.mock.json');
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


describe('Notes:basic', () => {

  it('POST /notes => should create new note', (done) => {
    apiLink
      .post(`/notes`)
      .send(mockNotes.dataForCreating)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('note is created !');
        done(err);
      });
  });

  it('GET /notes => should return all notes', (done) => {
    apiLink
      .get(`/notes`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('data');
        chai.expect(res.body).to.have.property('total');
        done(err);
      });
  });

  it('GET /notes/:id => should return note with id === (:id)', (done) => {
    apiLink
      .get(`/notes/${ mockNotes.id }`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('data');
        done(err);
      });
  });

  it('(token) PATCH /notes/:id => should update note with id === (:id)', (done) => {
    apiLink
      .patch(`/notes/${ mockNotes.id }`)
      .set({ Authorization: globalStorage.token })
      .send(mockNotes.dataForUpdating)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('note is updated !');
        done(err);
      });
  });

  it('DELETE /notes/:id => should delete note with id === (:id)', (done) => {
    apiLink
      .delete(`/notes/${ mockNotes.id }`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('note is deleted !');
        done(err);
      });
  });

});


describe('< delete useless data >', () => {

  it('=> delete useless user', (done) => {
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
