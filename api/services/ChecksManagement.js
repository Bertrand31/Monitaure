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

    insertHistoryAndOutage: function(checks) {
        checks.forEach(function(check) {
            Checks.findOne({id: check.id}).exec(function (err, target) {
                if (err) throw err;

                var newHistoryArray = target.history;
                var newOutagesArray = target.outages;

                // Keep the history to 20 elements maximum
                while (newHistoryArray.length >= 20) {
                    newHistoryArray.shift();
                }
                newHistoryArray.push({date: check.date, time: check.open ? check.duration : null});

                var oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                // If the first value of the array is older than a month, we remove it
                // We keep doing that until the oldest value is younger than a month
                if (typeof newOutagesArray[0] !== 'undefined') {
                    while (newOutagesArray[0].getTime() < oneMonthAgo.getTime()) {
                        newOutagesArray.shift();
                    }
                }
                if (!check.open) {
                    newOutagesArray.push(check.date);
                }

                // And update the DB record
                Checks.update({id: check.id}, {history: newHistoryArray, outages: newOutagesArray}).exec(function(err, updated) {
                    if (err) throw err;
                });

            });
        });
    }

};
