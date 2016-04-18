var domainNameRegex = /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i,
    ipAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/i;

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
                        name: String(data.name),
                        domainNameOrIP: String(data.domainNameOrIP),
                        port: Number(data.port),
                        owner: String(userId)
                    };
                    if (!domainNameRegex.test(checkData.domainNameOrIP) && !ipAddressRegex.test(checkData.domainNameOrIp)) {
                        return callback('Incorrect domain name or IP');
                    } else if (!checkData.name || !checkData.port) {
                        return callback('Incorrect attributes');
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

    destroyCheck: function(userId, checkId, callback) {
        Check.findOne({id: checkId}).exec(function (err, check) {
            if (err) {
                callback(err);
            } else if (check.owner !== userId) {
                return callback('You do not have access to this check');
            } else {
                Check.destroy(checkId).exec(function (err, destroyed) {
                    return callback(err, destroyed);
                });
            }
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

            var checkStats = CheckManagement.checkStats(check, 20);
            if (!checkStats) {
                return callback('No data yet!');
            } else {
                return callback(null, checkStats);
            }

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

                var checkStats = CheckManagement.checkStats(user.checks[i], 1);
                // If `err` the check's history array is empty: we have no data to process
                if (checkStats) {
                    // If current check is currently up, we add increment checksUp array
                    // We do that by looking up his last 'history' array value
                    if (checkStats.history[checkStats.history.length - 1].time !== null) {
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
                    // We replace current check's history with the trimmed version from 'checkStats'
                    user.checks[i].history = checkStats.history;
                }
            }

            // Calculate the average of all the checks availabilities
            var availabilitiesAvg = Utilities.customFloor(availabilitiesSum / numberOfChecks, 2);

            // Object containing the user information and its checks
            var userData = {
                userName: user.username,
                userEmailMD5: user.emailHash,
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

            var historyShort = historyArray.splice(historyArray.length - historyLength , historyLength);

            return {
                name: check.name,
                min: min,
                max: max,
                avg: avg,
                availability: availability,
                lastOutage: lastOutage,
                history: historyShort
            };
        } else {
            return null;
        }
    }

};
