var sails = require('sails');
var assert = require('assert');
var request = require('supertest');

before(function(done) {
    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(5000);
    sails.lift({
        // configuration for testing purposes
    }, function(err, server) {
        if (err) return done(err);
        // here you can load fixtures, etc.
        done(err, sails);
    });
});

// describe('UserModel', function() {

//     describe('#find()', function() {
//         it('should check find function', function (done) {
//             User.find()
//                 .then(function(results) {
//                     // Tests
//                     done();
//                 })
//             .catch(done);
//         });
//     });

// });

describe('UserController', function() {

    describe('#signup()', function() {
        it('should create an user', function (done) {
            request(sails.hooks.http.app)
                .post('/signup')
                .send({ name: 'TestUser', email: 'testuser@test.com', password: 'testpassword', confirmPassword: 'testpassword' })
                .expect(200);
            done();
        });
    });
    describe('#login()', function() {
        it('should redirect to /dashboard', function (done) {
            request(sails.hooks.http.app)
                .post('/login')
                .send({ name: 'TestUser', password: 'testpassword' })
                .expect(200);
            done();
        });
    });

});

after(function(done) {
    // here you can clear fixtures, etc.
    // sails.lower(done);
    done();
});
