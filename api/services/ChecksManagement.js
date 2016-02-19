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
        Checks.destroy(check_id).exec(function (err, destroyed) {
            if (err) throw err;
            callback(destroyed);
        });
    },

    insertHistory: function(check, callback) {
        Checks.find({id: check[0].id}).exec(function (err, target) {
            if (err) throw err;

            var newHistoryArray = target[0].history;
            newHistoryArray.push({date: check[0].date, time: check[0].open ? check[0].duration : null});
            Checks.update({id: check[0].id}, {history: newHistoryArray}).exec(function(err, updated) {
                if (err) throw err;
                callback('success');
            });

        });
    }

};
