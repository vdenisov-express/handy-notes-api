const chai = require('chai');
const supertest = require('supertest');


const mockTags = require('./mock.json').Tags;
const apiLink = supertest('http://localhost:3000/api/v1');


describe('Tags:basic', () => {

  it('POST /tags => should create new tag', (done) => {
    apiLink
      .post(`/tags`)
      .send(mockTags.dataForCreating)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body['message']).to.equal('tag is created !');
        done(err);
      });
  });

  it('GET /tags => should return all tags', (done) => {
    apiLink
      .get(`/tags`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('data');
        done(err);
      });
  });

  it('GET /tags/:id => should return tag with id === (:id)', (done) => {
    apiLink
      .get(`/tags/${ mockTags.id }`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('data');
        done(err);
      });
  });

  it('PATCH /tags/:id => should update tag with id === (:id)', (done) => {
    apiLink
      .patch(`/tags/${ mockTags.id }`)
      .send(mockTags.dataForUpdating)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body['message']).to.equal('tag is updated !');
        done(err);
      });
  });

  it('DELETE /tags/:id => should delete tag with id === (:id)', (done) => {
    apiLink
      .delete(`/tags/${ mockTags.id }`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200, 'res.status');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body['message']).to.equal('tag is deleted !');
        done(err);
      });
  });

});
