const { describe, it } = require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');

const apiLink = supertest('http://localhost:3000/api/v1');
const mockUsers = require('./../../users/test/users.mock.json');
const mockNotes = require('./notes.mock.json');
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

describe('Notes:basic', () => {
  it('POST /notes => should create new note', async () => {
    // execute query
    const res = await apiLink
      .post(`/notes`)
      .send(mockNotes.dataForCreating);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('note is created !');
  });

  it('GET /notes => should return all notes', async () => {
    // execute query
    const res = await apiLink
      .get(`/notes`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('total');
  });

  it('GET /notes/:id => should return note with id === (:id)', async () => {
    // execute query
    const res = await apiLink
      .get(`/notes/${mockNotes.id}`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('data');
  });

  it('(token) PATCH /notes/:id => should update note with id === (:id)', async () => {
    // execute query
    const res = await apiLink
      .patch(`/notes/${mockNotes.id}`)
      .set({ Authorization: globalStorage.token })
      .send(mockNotes.dataForUpdating);

    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('note is updated !');
  });

  it('DELETE /notes/:id => should delete note with id === (:id)', async () => {
    // execute query
    const res = await apiLink
      .delete(`/notes/${mockNotes.id}`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('note is deleted !');
  });
});

describe('< delete useless data >', () => {
  it('=> delete useless user', async () => {
    // execute query
    const res = await apiLink
      .delete(`/users/${mockUsers.id}`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('user is deleted !');
  });
});
