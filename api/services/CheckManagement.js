module.exports = {

    createCheck: function(userId, data, callback) {
        User.findOne({id: userId}).populate('checks').exec(function (err, user) {
            if (err) {
                return callback(err);
            } else {
                // We test the number of checks this user has against the limit
                if (user.checks.length >= sails.config.checksNbLimit) {
                    return callback('You reached the limit of ten checks per user');
                } else {
                    var checkData = {
                        name: data.name,
                        domainNameOrIP: data.domainNameOrIP,
                        port: data.port,
                        owner: userId
                    };
                    // TODO: Improve & throw appropriate error message
                    if (checkData.name.length === 0 || checkData.domainNameOrIP.length === 0 || checkData.port === 0) {
                        return callback('Invalid attributes');
                    } else {
                        Check.create(checkData).exec(function (err, created) {
                            return callback(err, created);
                        });
                    }
                }
            }
        });
    },

    updateCheck: function(userId, checkId, data, callback) {
        Check.findOne({id: checkId}).exec(function (err, check) {
            if (err) {
                callback(err);
            } else if (check.owner !== userId) {
                return callback('You do not have access to this check');
            } else {
                Check.update({id: checkId}, data).exec(function (err, updated) {
                    return callback(err, updated);
                });
            }
        });
    },

    destroyCheck: function(checkId, callback) {
        Check.destroy(checkId).exec(function (err, destroyed) {
            if (err) throw err;
            callback(destroyed);
        });
    },

    insertHistory: function(ping) {
        Check.findOne({id: ping.checkId}).exec(function (err, check) {
            if (err) throw err;

            var newHistoryArray = check.history;

            var oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

            // If the first value of the array is older than a month, we remove it
            // We keep doing that until the oldest value is younger than a month
            if (typeof newHistoryArray[0] !== 'undefined') {
                while (newHistoryArray[0].date.getTime() < oneMonthAgo.getTime()) {
                    newHistoryArray.shift();
                }
            }

            newHistoryArray.push({date: ping.date, time: ping.open ? ping.duration : null, interval: check.interval});

            // And update the DB record
            Check.update({id: ping.checkId}, {history: newHistoryArray}).exec(function(err) {
                if (err) throw err;
            });

        });
    },

    getData: function(checkId, callback) {
        Check.findOne({id: checkId}).exec(function (err, check) {
            if (err) return callback(err);

            CheckManagement.checkStats(check, 20, function(err, data) {
                return callback(err, data);
            });

       });
    },

    getCheckMinimalData: function(userId, checkId, callback) {
        Check.findOne({id: checkId}).exec(function (err, check) {
            if (check.owner !== userId) {
                return callback('You do not have access to this check');
            } else {
                return callback(err, {
                    name: check.name,
                    domainNameOrIP: check.domainNameOrIP,
                    port: check.port,
                    emailNotifications: check.emailNotifications
                });
            }

       });
    },

    getUserAndChecksData: function(userId, callback) {
        User.findOne({id: userId}).populate('checks').exec(function (err, user) {

            var lastError = {
                    time: null,
                    checkName: null
                },
                checksUp = 0,
                numberOfChecks = user.checks.length,
                availabilitiesSum = 0;

            for(var i = 0; i < user.checks.length; i++) {

                CheckManagement.checkStats(user.checks[i], 1, function(err, checkStats) {
                    if (!err) {
                        // If current check is currently up, we add increment checksUp array
                        // We do that by looking up his last 'history' array value
                        if (checkStats.history[0].time !== null) {
                            checksUp++;
                        }
                        // We add current check's availability stats to the availabilities sum
                        availabilitiesSum += checkStats.availability;
                        // If current check's last outage is more recent than the one
                        // stored in lastError, we update the lastError object
                        if (checkStats.lastOutage > lastError.time) {
                            lastError.time = checkStats.lastOutage;
                            lastError.checkName = checkStats.name;
                        }
                        user.checks[i].history = checkStats.history;
                    }
                });
            }

            // Calculate the average of all the checks availabilities
            var availabilitiesAvg = Utilities.customFloor(availabilitiesSum / numberOfChecks, 2);

            // Object containing the user information and its checks
            var emailHash = require('crypto').createHash('md5').update(user.email).digest('hex');
            var userData = {
                userName: user.username,
                userEmailMD5: emailHash,
                checks: user.checks
            };
            // Object containing all previously computed stats
            var globalStats = {
                numberOfChecks,
                checksUp,
                availabilitiesAvg,
                lastError
            };

            return callback(err, {
                userData,
                globalStats
            });
        });
    },

    checkStats: function(check, historyLength, callback) {
        var historyArray = check.history;
        if (historyArray.length > 0) {
            var sum = 0,
                min = historyArray[0].time,
                max = historyArray[0].time,
                avg = 0,
                totalOutage = 0,
                historyTimeSpan = 0,
                lastOutage = null;

            for (var i=0; i<historyArray.length; i++) {
                if (historyArray[i].time !== null) {
                    sum += historyArray[i].time;
                    min = historyArray[i].time < min ? historyArray[i].time : min;
                    max = historyArray[i].time > max ? historyArray[i].time : max;
                } else {
                    totalOutage += historyArray[i].interval;
                    lastOutage = historyArray[i].date;
                }
                historyTimeSpan += historyArray[i].interval;
            }
            avg = Math.round(sum / historyArray.length);

            // Number of miliseconds in a month (30 days more exactly)
            var percent = 100 - (totalOutage * 100) / historyTimeSpan;
            // We round the percentage to two places
            var availability = Utilities.customFloor(percent, 2);

            var historyShort = historyArray.splice(historyArray.length - historyLength - 1, historyLength);

            return callback(null, {
                name: check.name,
                min: min,
                max: max,
                avg: avg,
                availability: availability,
                lastOutage: lastOutage,
                history: historyShort
            });
        } else {
            return callback('No data yet!', null);
        }
    }

};
