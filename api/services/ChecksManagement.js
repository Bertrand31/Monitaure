var ObjectId = require('mongodb').ObjectID;

module.exports = {

    listChecks: function(check_id, callback) {
        var criteria = check_id ? {id: check_id} : null;
        Checks.find(criteria).exec(function (err, records) {
            if (err) throw err;
            callback(records);
        });
    },

    createCheck: function(data, callback) {
        Checks.create(data).exec(function (err, created) {
            if (err) throw err;
            callback(created);
        });
    },

    updateCheck: function(criteria, data, callback) {
        Checks.update(criteria, data).exec(function (err, updated) {
            if (err) throw err;
            callback(updated);
        });
    },

    destroyCheck: function(check_id, callback) {
        var criteria = check_id ? {id: check_id} : null;
        Checks.destroy(criteria).exec(function (err, destroyed) {
            if (err) throw err;
            callback(destroyed);
        });
    }

};
