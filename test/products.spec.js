const app = require('../server/app');
const {randomArrayItem} = require('./support/helpers');
const expect = require('chai').expect
const request = require('supertest');

describe('Products', function() {
  describe('GET /api/products', function() {
    it('returns a list of products', function(done) {
      request(app)
        .get('/api/products')
        .expect(200)
        .end(function(error, response) {
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.lengthOf.at.least(1);

          if (error) return done(error);
          done();
        });
    });
  });

  describe('POST /api/products', function() {
    it('returns 404 response for an unsupport request method', function(done) {
      request(app)
        .post('/api/products')
        .expect(404, done);
    });
  });

  describe('GET /api/products/<id>', function() {
    let productId = 1;

    it('returns a single product', function(done) {
      request(app)
        .get(`/api/products/${productId}`)
        .expect(200)
        .end(function(error, response) {
          expect(response.body).to.be.an('object');
          expect(response.body.title).to.be.a('string');
          expect(response.body.category).to.be.an('array');
          expect(response.body.availability).to.be.a('boolean');
          expect(response.body.current_price).to.be.a('number');
          expect(response.body.description).to.be.a('string');
          expect(response.body.inventory).to.be.a('number');

          if (error) return done(error);
          done();
        });
    });
  });

  describe('GET /api/products/<id>/reviews', function() {
    let productId = 1;

    it('returns reviews for the given product', function(done) {
      request(app)
        .get(`/api/products/${productId}/reviews`)
        .expect(200)
        .end(function(error, response) {
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.a.lengthOf.at.least(1);
          expect(response.body.map(review => review.product_id)).to.have.members([1])

          if (error) return done(error);
          done();
        });
    });

    // it('returns a single review for a given product', function(done) => {
      
    // });

    // it('should', () => {
      
    // });
  });
});