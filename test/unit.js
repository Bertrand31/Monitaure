const assert = require('chai').assert;
// const expect = require('chai').expect;

const CheckManagement = require('../api/services/CheckManagement.js');
const UserManagement = require('../api/services/UserManagement.js');

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
        { date: new Date('2016-05-12T20:01:31.809Z'), duration: 34 },
        { date: new Date('2016-05-12T20:02:55.067Z'), duration: 35 },
        { date: new Date('2016-05-12T20:03:55.117Z'), duration: 26 },
        { date: new Date('2016-05-12T20:04:55.101Z'), duration: 29 },
        { date: new Date('2016-05-12T20:05:55.135Z'), duration: 32 },
        { date: new Date('2016-05-12T20:06:55.158Z'), duration: 27 },
        { date: new Date('2016-05-12T20:07:55.167Z'), duration: 27 },
        { date: new Date('2016-05-12T20:08:55.201Z'), duration: 32 },
        { date: new Date('2016-05-12T20:09:55.227Z'), duration: 27 },
        { date: new Date('2016-05-12T20:10:55.257Z'), duration: 27 },
        { date: new Date('2016-05-12T20:11:55.267Z'), duration: 27 },
        { date: new Date('2016-05-12T20:12:55.291Z'), duration: 27 },
        { date: new Date('2016-05-12T20:13:55.319Z'), duration: 26 },
        { date: new Date('2016-05-12T20:14:55.335Z'), duration: 28 },
        { date: new Date('2016-05-12T20:15:55.348Z'), duration: 28 },
        { date: new Date('2016-05-12T20:16:55.361Z'), duration: 35 },
        { date: new Date('2016-05-12T20:17:55.391Z'), duration: 94 },
        { date: new Date('2016-05-12T20:18:55.397Z'), duration: 28 },
        { date: new Date('2016-05-12T20:19:55.426Z'), duration: 240 },
        { date: new Date('2016-05-12T20:20:55.454Z'), duration: 103 },
        { date: new Date('2016-05-12T20:21:55.464Z'), duration: 25 },
        { date: new Date('2016-05-12T20:22:55.521Z'), duration: 27 },
        { date: new Date('2016-05-12T20:23:55.543Z'), duration: 25 }
    ],
    createdAt: '2016-05-12T19:56:17.519Z',
    updatedAt: '2016-05-12T20:23:55.572Z',
    id: '5734dfa3a55ad89e36d722f8'
};

const fakeDB = {
    create: function(itemType, data, callback) {
        if (typeof itemType !== 'string' || typeof data !== 'object') throw new Error('Incorrect input types');

        if (itemType === 'user')
            return callback(null, fakeUser);
        else if (itemType === 'check')
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
    let user;
    // let check;

    it('should create an user', function(done) {
        const userData = {
            username: 'Test User',
            email: 'bertrandjun@gmail.com',
            password: 'testtest',
            confirmPassword: 'testtest'
        };
        UserManagement.create(fakeDB.create, userData, function(err, createdUser) {
            assert.isNull(err, 'did not throw an error');
            assert.isObject(createdUser, 'return an user');
            assert.deepEqual(createdUser.username, userData.username, 'return an user with well populated fields');
            user = createdUser;
            done();
        });
    });
    it('should confirm the user', function(done) {
        UserManagement.confirm(fakeDB.update, user.id, function(err) {
            assert.isNull(err, 'did not throw an error');
            done();
        });
    });
    // it('should create a check', function(done) {
    //     const checkData = {
    //         name: 'HTTP @ Google',
    //         domainNameOrIP: 'google.fr',
    //         port: 80,
    //         emailNotifications: true,
    //         owner: fakeUser.id
    //     };
    //     CheckManagement.createCheck(fakeDB.fetchAndPopulate, fakeDB.create, user.id, checkData, function(err, createdCheck) {
    //         assert.isNull(err, 'did not throw an error');
    //         assert.isObject(createdCheck, 'created a check');
    //         assert.deepEqual(createdCheck.name, checkData.name, 'return a check with well populated fields');
    //         check = createdCheck;
    //         done();
    //     });
    // });
    it('should update the created check', function(done) {
        const data = {
            name: 'HTTP @ Google 2'
        };
        CheckManagement.updateCheck(fakeDB.fetchOne, fakeDB.update, fakeUser.id, fakeCheck.id, data, function(err, updatedChecks) {
            assert.isNull(err, 'did not throw an error');
            assert.isArray(updatedChecks, 'returned an array');
            assert.deepEqual(updatedChecks[0].name, data.name, 'updated the check\'s data');
            check = updatedChecks[0];
            done();
        });
    });
    // it('should add a ping to check\'s history', function(done) {
    //     const ping = {
    //         checkId: '5734dfa3a55ad89e36d722f8',
    //         open: true,
    //         duration: 453,
    //         date: new Date('2016-05-12T20:23:55.543Z')
    //     };
    //     CheckManagement.insertHistory(fakeDB.fetchOne, fakeDB.update, ping, function(err) {
    //         assert.isNull(err, 'did not throw an error');
    //         done();
    //     });
    // });
    it('should destroy the created check', function(done) {
        CheckManagement.destroyCheck(fakeDB.fetchOne, fakeDB.destroy, fakeUser.id, fakeCheck.id, function(err, destroyed) {
            assert.isNull(err, 'did not throw an error');
            assert.isArray(destroyed, 'returned an array');
            assert.isObject(destroyed[0], 'the array contains the deleted check');
            done();
        });
    });
});
