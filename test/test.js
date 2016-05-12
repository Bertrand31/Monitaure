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


describe('#user and check management', function() {
    let user,
        check;

    step('should create an user', function(done) {
        const userData = {
            username: 'test',
            email: 'bertrandjun@gmail.com',
            password: 'testtest',
            confirmPassword: 'testtest'
        };
        UserManagement.create(DB.create, userData, function(err, createdUser) {
            assert.isNull(err, 'did not throw an error');
            assert.isObject(createdUser, 'return an user');
            user = createdUser;
            done();
        });
    });
    step('should create a check', function(done) {
        const checkData = {
            name: 'HTTP @ Google',
            domainNameOrIP: 'google.fr',
            port: '80',
            emailNotifications: true,
            owner: user.id
        };
        CheckManagement.createCheck(DB.fetchAndPopulate, DB.create, user.id, checkData, function(err, created) {
            assert.isNull(err, 'did not throw an error');
            assert.isObject(created, 'created a check');
            check = created;
            done();
        });
    });
    step('should update the created check', function(done) {
        const data = {
            name: 'HTTP @ Google',
            emailNotifications: false
        };
        CheckManagement.updateCheck(DB.fetchOne, DB.update, user.id, check.id, data, function(err, updated) {
            assert.isNull(err, 'did not throw an error');
            assert.isArray(updated, 'updated the check');
            done();
        });
    });
    step('should destroy the created check', function(done) {
        CheckManagement.destroyCheck(DB.fetchOne, DB.destroy, user.id, check.id, function(err, destroyed) {
            assert.isNull(err, 'did not throw an error');
            assert.isArray(destroyed, 'updated the check');
            done();
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
