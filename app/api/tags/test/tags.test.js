const { describe, it } = require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');

const apiLink = supertest('http://localhost:3000/api');
const mockUsers = require('./../../users/users.mock.json');
const mockNotes = require('./../../notes/notes.mock.json');
const mockTags = require('./tags.mock.json');
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

  it('=> create note for tags', async () => {
    // execute query
    const res = await apiLink
      .post(`/notes`)
      .send(mockNotes.dataForCreating);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('note is created !');
  });
});

describe('Tags:basic', () => {
  it('POST /tags => should create new tag', async () => {
    // execute query
    const res = await apiLink
      .post(`/tags`)
      .send(mockTags.dataForCreating);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('tag is created !');
  });

  it('GET /tags => should return all tags', async () => {
    // execute query
    const res = await apiLink
      .get(`/tags`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('data');
    expect(res.body).to.have.property('total');
  });

  it('GET /tags/:id => should return tag with id === (:id)', async () => {
    // execute query
    const res = await apiLink
      .get(`/tags/${mockTags.id}`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('data');
  });

  it('PATCH /tags/:id => should update tag with id === (:id)', async () => {
    // execute query
    const res = await apiLink
      .patch(`/tags/${mockTags.id}`)
      .send(mockTags.dataForUpdating);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('tag is updated !');
  });

  it('DELETE /tags/:id => should delete tag with id === (:id)', async () => {
    // execute query
    const res = await apiLink
      .delete(`/tags/${mockTags.id}`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('tag is deleted !');
  });
});

describe('< delete useless data >', () => {
  it('=> delete useless note', async () => {
    // execute query
    const res = await apiLink
      .delete(`/notes/${mockNotes.id}`);

    // check response
    expect(res.status).to.equal(200, 'res.status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('note is deleted !');
  });

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
