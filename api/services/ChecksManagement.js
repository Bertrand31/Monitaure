var ObjectId = require('mongodb').ObjectID;

module.exports = {

    listChecks: function(id, callback) {
        console.log({_id: new ObjectId(id)});
        Checks.find({_id: new ObjectId(id)}).exec(function listChecks(err, records) {
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

    destroyCheck: function(id, callback) {
        console.log({_id: new ObjectId(id)});
        Checks.destroy({_id: new ObjectId(id)}).exec(function (err, destroyed) {
            if (err) throw err;
            callback(destroyed);
        });
    }

}
