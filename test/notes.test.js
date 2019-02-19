const chai = require('chai');
const supertest = require('supertest');


const mockNotes = require('./mock.json').Notes;
const apiLink = supertest('http://localhost:3000/api/v1');


describe('Notes:basic', () => {

  it('POST /notes => should create new note', (done) => {
    apiLink
      .post(`/notes`)
      .send(mockNotes.dataForCreating)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body['message']).to.equal('note is created !');
        done(err);
      });
  });

  it('GET /notes => should return all notes', (done) => {
    apiLink
      .get(`/notes`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('data');
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
        chai.expect(res.body['message']).to.equal('note is updated !');
        done(err);
      });
  });

  it('DELETE /notes/:id => should delete note with id === (:id)', (done) => {
    apiLink
      .delete(`/notes/${ mockNotes.id }`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body['message']).to.equal('note is deleted !');
        done(err);
      });
  });

});
