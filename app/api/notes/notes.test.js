const chai = require('chai');
const supertest = require('supertest');


const apiLink = supertest('http://localhost:3000/api/v1');
const mockNotes = {
  id: 1,

  dataForCreating: {
    title: 'test title for note',
    text: 'test description for test note',
    userId: 1,
  },

  dataForUpdating: {
    text: 'new text for test note',
  },
};
const mockUsers = {
  id: 1,

  dataForCreating: {
    name: 'Junior Tester',
    email: 'test@gmail.com',
    password: 'idontknow',
    phone: '+0-000-000-00-00',
    birthdate: '10.10.1010',
  },
};


describe('< create needed data >', () => {

  it('=> create user for notes', (done) => {
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

  it('PATCH /notes/:id => should update note with id === (:id)', (done) => {
    apiLink
      .patch(`/notes/${ mockNotes.id }`)
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

  it('=> delete usefull user', (done) => {
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
