const app = require('../server/app');
const {randomArrayItem, onlyUnique} = require('./support/helpers');
const expect = require('chai').expect
const request = require('supertest');



describe('Reviews', function() {
  describe('GET /api/reviews', function() {
    it('returns a list of reviews', function(done) {
      request(app)
        .get('/api/reviews')
        .expect(200)
        .end(function(error, response) {
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.a.lengthOf.at.least(1);
          
          if (error) return done(error);
          done();
        });
    });

  });

  describe('GET /api/reviews/<id>', function() {
    let reviewId = 1;
    it('returns a single review', function(done) {
      request(app)
        .get(`/api/reviews/${reviewId}`)
        .expect(200)
        .end(function(error, response) {
          expect(response.body).to.be.an('object');
          expect(response.body.review_text).to.be.a('string');
          expect(response.body.rating).to.be.a('number');

          
          if (error) return done(error);
          done();
        });
    });
  });
});