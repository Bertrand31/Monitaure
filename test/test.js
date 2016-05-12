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

const fakeUser = {
    username: 'Test User',
    email: 'bertrandjun@gmail.com',
    password: '$2a$10$4M/ShIlen3bSud80/131du99FCn76yMtdU6otysutV2yAfBbfizKm',
    confirmedAccount: false,
    emailHash: '$2a$10$kuSsGa6PjZtDRWPnFq846OmbHoShQ.GRhCAqt4SCczyJehMPbSFIm',
    confirmationToken: '032c0de1efc370edaa416e69a2fad16a',
    createdAt: '2016-05-12T20:40:44.517Z',
    updatedAt: '2016-05-12T20:40:44.517Z',
    id: '5734dfe1a55ad89e36d722f9'
};

const fakeCheck = {
    owner: '5734dfe1a55ad89e36d722f9',
    name: 'HTTP @ Google',
    domainNameOrIP: 80,
    emailNotifications: true,
    history: [
        { date: '2016-05-12T20:01:31.809Z', time: 34 },
        { date: '2016-05-12T20:02:55.067Z', time: 35 },
        { date: '2016-05-12T20:03:55.117Z', time: 26 },
        { date: '2016-05-12T20:04:55.101Z', time: 29 },
        { date: '2016-05-12T20:05:55.135Z', time: 32 },
        { date: '2016-05-12T20:06:55.158Z', time: 27 },
        { date: '2016-05-12T20:07:55.167Z', time: 27 },
        { date: '2016-05-12T20:08:55.201Z', time: 32 },
        { date: '2016-05-12T20:09:55.227Z', time: 27 },
        { date: '2016-05-12T20:10:55.257Z', time: 27 },
        { date: '2016-05-12T20:11:55.267Z', time: 27 },
        { date: '2016-05-12T20:12:55.291Z', time: 27 },
        { date: '2016-05-12T20:13:55.319Z', time: 26 },
        { date: '2016-05-12T20:14:55.335Z', time: 28 },
        { date: '2016-05-12T20:15:55.348Z', time: 28 },
        { date: '2016-05-12T20:16:55.361Z', time: 35 },
        { date: '2016-05-12T20:17:55.391Z', time: 94 },
        { date: '2016-05-12T20:18:55.397Z', time: 28 },
        { date: '2016-05-12T20:19:55.426Z', time: 240 },
        { date: '2016-05-12T20:20:55.454Z', time: 103 },
        { date: '2016-05-12T20:21:55.464Z', time: 25 },
        { date: '2016-05-12T20:22:55.521Z', time: 27 },
        { date: '2016-05-12T20:23:55.543Z', time: 25 } ],
    createdAt: '2016-05-12T19:56:17.519Z',
    updatedAt: '2016-05-12T20:23:55.572Z',
    id: '5734dfa3a55ad89e36d722f8'
};

const fakeDB = {
    create: function(itemType, data, callback) {
        if (typeof itemType !== 'string' || typeof data !== 'object') throw new Error('Incorrect input types');

        if (itemType !== 'user')
            return callback(null, fakeUser);
        else if (itemType !== 'check')
            return callback(null, fakeCheck);
    },

    update: function(itemType, filterCriteria, newData, callback) {
        if (typeof itemType !== 'string' || typeof filterCriteria !== 'object' || typeof newData !== 'object') throw new Error('Incorrect input types');

        if (itemType === 'user') {
            fakeUser.username = 'Test User 2';
            return callback(null, [fakeUser]);
        } else if (itemType === 'check') {
            fakeCheck.name = 'HTTP @ Google 2';
            return callback(null, [fakeCheck]);
        }
    },

    destroy: function(itemType, itemId, callback) {
        if (typeof itemType !== 'string' || typeof itemId !== 'string') throw new Error('Incorrect input types');

        if (itemType === 'user')
            return callback(null, [fakeUser]);
        else if (itemType === 'check')
            return callback(null, [fakeCheck]);
    },

    fetch: function(itemsType, criteria, callback) {
        if (typeof itemsType !== 'string' || typeof criteria !== 'object') throw new Error('Incorret input types');

        if (itemsType === 'check')
            return callback(null, [fakeCheck]);
        else if (itemsType === 'user')
            return callback(null, [fakeUser]);
    },

    fetchOne: function(itemType, itemId, callback) {
        if (typeof itemType !== 'string' || typeof itemId !== 'string') throw new Error('Incorrect input types');

        if (itemType === 'check')
            return callback(null, fakeCheck);
        else if (itemType === 'user')
            return callback(null, fakeUser);
    },

    fetchAndPopulate: function(itemType, itemId, associationType, callback) {
        if (typeof itemType !== 'string' || typeof itemId !== 'string' || typeof associationType !== 'string')
            throw new Error('Incorrect input types');

        const fakePopulatedUser = fakeUser;
        fakePopulatedUser.checks = [fakeCheck];
        return callback(null, fakePopulatedUser);
    }
};

describe('#user and check management', function() {
    let user,
        check;

    it('should create an user', function(done) {
        const userData = {
            username: 'test',
            email: 'bertrandjun@gmail.com',
            password: 'testtest',
            confirmPassword: 'testtest'
        };
        UserManagement.create(fakeDB.create, userData, function(err, createdUser) {
            assert.isNull(err, 'did not throw an error');
            assert.isObject(createdUser, 'return an user');
            user = createdUser;
            done();
        });
    });
    it('should create a check', function(done) {
        const checkData = {
            name: 'HTTP @ Google',
            domainNameOrIP: 'google.fr',
            port: 80,
            emailNotifications: true,
            owner: fakeUser.id
        };
        CheckManagement.createCheck(fakeDB.fetchAndPopulate, fakeDB.create, fakeUser.id, checkData, function(err, created) {
            assert.isNull(err, 'did not throw an error');
            assert.isObject(created, 'created a check');
            check = created;
            done();
        });
    });
    it('should update the created check', function(done) {
        const data = {
            name: 'HTTP @ Google 2',
        };
        CheckManagement.updateCheck(fakeDB.fetchOne, fakeDB.update, fakeUser.id, fakeCheck.id, data, function(err, updated) {
            assert.isNull(err, 'did not throw an error');
            assert.isArray(updated, 'updated the check');
            done();
        });
    });
    it('should destroy the created check', function(done) {
        CheckManagement.destroyCheck(fakeDB.fetchOne, fakeDB.destroy, fakeUser.id, fakeCheck.id, function(err, destroyed) {
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
