const app = require('../server/app');
const {randomArrayItem, onlyUnique} = require('./support/helpers');
const expect = require('chai').expect
const request = require('supertest');

describe('Users', () => {
  describe('GET /api/users', function() {
    it('returns a list of users', function(done) {
      request(app)
        .get('/api/users')
        .expect(200)
        .end(function(error, response) {
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.lengthOf.at.least(1);

          let actualUser = randomArrayItem(response.body);

          expect(actualUser.id).to.be.a('number');
          expect(actualUser.first_name).to.be.a('string');
          expect(actualUser.last_name).to.be.a('string');
          expect(actualUser.gender).to.match(/Male|Female/);
          expect(actualUser.email).to.match(/[a-zA-Z0-9.-]@[a-zA-Z0-9].[a-zA-Z]/);
          expect(actualUser.avatar).to.be.a('string');
          expect(actualUser.street_address).to.be.a('string');
          expect(actualUser.city).to.be.a('string');
          expect(actualUser.state_abrv).to.be.a('string').that.matches(/[A-Z]{2}/);
          expect(actualUser.zip).to.be.a('number').that.matches(/\d{5}/);
          expect(actualUser.country).to.be.a('string');
          expect(actualUser.created_at).to.be.a('string');
          expect(actualUser.updated_at).to.be.a('string');

          if (error) return done(error);
          done();
        });
    });
  });

  describe('GET /api/users/<id>', function() {
    let userId = 1;

    it('returns a single user', function(done) {
      request(app)
        .get(`/api/users/${userId}`)
        .expect(200)
        .end(function(error, response) {
          expect(response.body).to.be.an('object');

          if (error) return done(error);
          done();
        });
    });
  });

  describe('GET /api/users/<id>/reviews', () => {
    let userId = 1;
  
    it('returns a list of reviews for a given user', function(done) {
      request(app)
        .get(`/api/users/${userId}/reviews`)
        .expect(200)
        .end(function(error, response) {
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.a.lengthOf.at.least(1);

          if (error) return done(error);
          done();
        })
    });

    it('does not return multiple reviews for the same product', function(done) {
      request(app)
        .get(`/api/users/${userId}/reviews`)
        .expect(200)
        .end(function(error, response) {
          let allProductIds = response.body.map(r => r.product_id);
          let uniqueProductIds = allProductIds.filter(onlyUnique);

          expect(allProductIds.length).to.equal(uniqueProductIds.length);

          if (error) return done(error);
          done();
        });
    });
  });
});