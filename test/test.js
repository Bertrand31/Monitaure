const sails = require('sails');
const assert = require('chai').assert;
const expect = require('chai').expect;
const request = require('supertest');

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


let userId;

describe('UserManagement', function() {
    describe('#create', function() {
        const userData = {
            username: 'test',
            email: 'bertrandjun@gmail.com',
            password: 'testtest',
            confirmPassword: 'testtest'
        };
        it('should create an user', function(done) {
            UserManagement.createUser(userData, function(err, createdUser) {
                assert.isNull(err, 'did not throw an error');
                assert.isObject(createdUser, 'return an user');
                userId = createdUser.id;
                done();
            });
        });
    });
});
describe('CheckManagement', function() {
    describe('#createCheck()', function() {
        const checkData = {
            name: 'HTTP @ Google',
            domainNameOrIP: 'google.fr',
            port: '80',
            emailNotifications: 'true',
            owner: userId
        };
        it('should create a check', function(done) {
            CheckManagement.createCheck(userId, checkData, function(err, created) {
                assert.isNull(err, 'did not throw an error');
                assert.isObject(created, 'created a check');
                done();
            });
        });
    });
});

// describe('UserController', function() {

//     describe('#signup()', function() {
//         it('should create an user', function (done) {
//             request(sails.hooks.http.app)
//                 .post('/signup')
//                 .send({ name: 'TestUser', email: 'testuser@test.com', password: 'testpassword', confirmPassword: 'testpassword' })
//                 .expect(200);
//             done();
//         });
//     });
//     describe('#login()', function() {
//         it('should redirect to /dashboard', function (done) {
//             request(sails.hooks.http.app)
//                 .post('/login')
//                 .send({ name: 'TestUser', password: 'testpassword' })
//                 .expect(200);
//             done();
//         });
//     });

// });

after(function(done) {
    // here you can clear fixtures, etc.
    // sails.lower(done);
    done();
});
