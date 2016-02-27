module.exports = {

    listChecks: function(id, callback) {
        var criteria = id ? {id: id} : null;
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

    updateCheck: function(id, data, callback) {
        var criteria = {id: id};
        Checks.update(criteria, data).exec(function (err, updated) {
            if (err) throw err;
            callback(updated);
        });
    },

    destroyCheck: function(id, callback) {
        Checks.destroy(id).exec(function (err, destroyed) {
            if (err) throw err;
            callback(destroyed);
        });
    },

    insertHistory: function(checks) {
        checks.forEach(function(check) {
            Checks.find({id: check.id}).exec(function (err, target) {
                if (err) throw err;

                var newHistoryArray = target[0].history;
                // Keep the history to 20 elements maximum
                if (target[0].history.length >= 20) {
                    newHistoryArray.shift();
                }
                // Push the new data
                newHistoryArray.push({date: check.date, time: check.open ? check.duration : null});
                // And update the DB record
                Checks.update({id: check.id}, {history: newHistoryArray}).exec(function(err, updated) {
                    if (err) throw err;
                });

            });
        });
    }

};
