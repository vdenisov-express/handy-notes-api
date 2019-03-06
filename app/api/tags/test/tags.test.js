const { expect } = require('chai');
const supertest = require('supertest');


const apiLink = supertest('http://localhost:3000/api/v1');
const mockUsers = require('./../../users/test/users.mock.json');
const mockNotes = require('./../../notes/test/notes.mock.json');
const mockTags = require('./tags.mock.json');
const globalStorage = { token: null };


describe('< create needed data >', () => {

  it('=> register user (for creating notes)', (done) => {
    apiLink
      .post(`/auth/register`)
      .send(mockUsers.dataForRegister)
      .end((err, res) => {
        expect(res.status).to.equal(200, 'res.status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('user is registered !');
        done(err);
      });
  });

  it('=> login user (for getting token)', (done) => {
    apiLink
      .post(`/auth/login`)
      .send(mockUsers.dataForLogin)
      .end((err, res) => {
        expect(res.status).to.equal(200, 'res.status');

        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('user is logged in !');

        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data.token).to.be.a('string');

        // save token to object "globalStorage"
        globalStorage.token = res.body.data.token;
        done(err);
      });
  });

  it('=> create note for tags', (done) => {
    apiLink
      .post(`/notes`)
      .send(mockNotes.dataForCreating)
      .end((err, res) => {
        expect(res.status).to.equal(200, 'res.status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('note is created !');
        done(err);
      });
  });

});


describe('Tags:basic', () => {

  it('POST /tags => should create new tag', (done) => {
    apiLink
      .post(`/tags`)
      .send(mockTags.dataForCreating)
      .end((err, res) => {
        expect(res.status).to.equal(200, 'res.status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('tag is created !');
        done(err);
      });
  });

  it('GET /tags => should return all tags', (done) => {
    apiLink
      .get(`/tags`)
      .end((err, res) => {
        expect(res.status).to.equal(200, 'res.status');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('total');
        done(err);
      });
  });

  it('GET /tags/:id => should return tag with id === (:id)', (done) => {
    apiLink
      .get(`/tags/${ mockTags.id }`)
      .end((err, res) => {
        expect(res.status).to.equal(200, 'res.status');
        expect(res.body).to.have.property('data');
        done(err);
      });
  });

  it('PATCH /tags/:id => should update tag with id === (:id)', (done) => {
    apiLink
      .patch(`/tags/${ mockTags.id }`)
      .send(mockTags.dataForUpdating)
      .end((err, res) => {
        expect(res.status).to.equal(200, 'res.status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('tag is updated !');
        done(err);
      });
  });

  it('DELETE /tags/:id => should delete tag with id === (:id)', (done) => {
    apiLink
      .delete(`/tags/${ mockTags.id }`)
      .end((err, res) => {
        expect(res.status).to.equal(200, 'res.status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('tag is deleted !');
        done(err);
      });
  });

});


describe('< delete useless data >', () => {

  it('=> delete useless note', (done) => {
    apiLink
      .delete(`/notes/${ mockNotes.id }`)
      .end((err, res) => {
        expect(res.status).to.equal(200, 'res.status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('note is deleted !');
        done(err);
      });
  });

  it('=> delete useless user', (done) => {
    apiLink
      .delete(`/users/${ mockUsers.id }`)
      .end((err, res) => {
        expect(res.status).to.equal(200, 'res.status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('user is deleted !');
        done(err);
      });
  });

});
