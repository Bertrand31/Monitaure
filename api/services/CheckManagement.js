const domainNameRegex = /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i,
      ipAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/i;

module.exports = {

    /**
     * Creates a check in database and returns it
     * @param {String} userId - the id of the user requesting this action
     * @param {Object} checkData - the attributes of the check to create
     * @param {Function} callback
     */
    createCheck: function(userId, checkData, callback) {
        DB.fetchAndPopulate('user', userId, 'checks', function(err, user) {
            if (err) return callback(err);

            // We test the number of checks this user has against the limit
            if (user.checks.length >= sails.config.checksNbLimit) {
                return callback('You reached the limit of ten checks per user');
            } else if (!domainNameRegex.test(checkData.domainNameOrIP) && !ipAddressRegex.test(checkData.domainNameOrIP)) {
                return callback('Incorrect domain name or IP address');
            } else if (!checkData.name || !checkData.port) {
                return callback('Incorrect attributes');
            } else {
                DB.create('check', checkData, function (err, created) {
                    return callback(err, created);
                });
            }
        });
    },

    /**
     * Update a check's name and notifications preferences
     * @param {String} userId - the id of the user requesting this action
     * @param {String} checkId - the id of the check to update
     * @param {Object} data - the attributes to update and their new contents
     * @param {Function} callback
     */
    updateCheck: function(userId, checkId, data, callback) {
        DB.fetchOne('check', checkId, function (err, check) {
            if (err) return callback(err);

            if (check.owner !== userId) {
                return callback('You do not have access to this check');
            } else {
                DB.update('check', checkId, data, function (err, updated) {
                    return callback(err, updated);
                });
            }
        });
    },

    /**
     * Destroy specified check from the dabatase
     * @param {String} userId - the id of the user requesting this action
     * @param {String} checkId - the id of the check to destroy
     * @param {Function} callback
     */
    destroyCheck: function(userId, checkId, callback) {
        DB.fetchOne('check', checkId, function(err, check) {
            if (err) return callback(err);

            if (check.owner !== userId) {
                return callback('You do not have access to this check');
            } else {
                DB.destroy('check', checkId, function (err, destroyed) {
                    return callback(err, destroyed);
                });
            }
        });
    },

    /**
     * Insert a ping into a check's history
     * @param {Object} ping - the result of a connexion attempt to a check
     */
    insertHistory: function(ping) {
        DB.fetchOne('check', ping.checkId, function (err, check) {
            if (err) return callback(err);

            const newHistoryArray = check.history;

            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

            // If the first value of the array is older than a month, we remove it
            // We keep doing that until the oldest value is younger than a month
            if (typeof newHistoryArray[0] !== 'undefined') {
                while (newHistoryArray[0].date.getTime() < oneMonthAgo.getTime()) {
                    newHistoryArray.shift();
                }
            }

            newHistoryArray.push({ date: ping.date, time: ping.open ? ping.duration : null });

            // And update the DB record
            DB.update('check', check.id, { history: newHistoryArray }, function(err) {
                if (err) sails.log.error(err);
            });

        });
    },

    /**
     * Retrieves a check's data, including its last 20 pings
     * @param {String} userId - the id of the user requesting this action
     * @param {String} checkId - the id of the check to retrieve data from
     * @param {Funtion} callback
     */
    getData: function(userId, checkId, callback) {
        DB.fetchOne('check', checkId, function (err, check) {
            if (err) {
                return callback(err);
            } else if (check.owner !== userId) {
                return callback('You do not have access to this check');
            } else {
                const checkStats = CheckManagement.checkStats(check, 20);
                if (!checkStats) {
                    return callback('No data yet!');
                } else {
                    return callback(null, checkStats);
                }
            }
       });
    },

    /**
     * Retrieves a check's minimal data (name, domainNameOrIP, port and notifications)
     * @param {String} userId - the id of the user requesting this action
     * @param {String} checkId - the id of the check to retrieve data from
     * @param {Function} callback
     */
    getCheckMinimalData: function(userId, checkId, callback) {
        DB.fetchOne('check', checkId, function (err, check) {
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

    /**
     * Retrieve the user's data and its checks, and then trims
     * their histories to keep only the last ping
     * @param {String} userId - the id of the user requesting this action
     * @param {Function} callback
     */
    getUserAndChecksData: function(userId, callback) {
        DB.fetchAndPopulate('user', userId, 'checks', function(err, user) {

            let lastError = {
                    time: null,
                    checkName: null
                },
                checksUp = 0,
                numberOfChecks = user.checks.length,
                availabilitiesSum = 0;

            for (let i = 0; i < user.checks.length; i++) {

                const checkStats = CheckManagement.checkStats(user.checks[i], 1);
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
            const availabilitiesAvg = Utilities.customFloor(availabilitiesSum / numberOfChecks, 2);

            // Object containing the user information and its checks
            const userData = {
                userName: user.username,
                userEmailMD5: user.emailHash,
                checks: user.checks
            };
            // Object containing all previously computed stats
            const globalStats = {
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

    /**
     * Calculates a check various stats by analyzing its history
     * Trims the check's history to only return a specified number of pings
     *  @param {Object} check - the raw db record of a check
     *  @param {Number} historyLength - the number of history entries to return
     */
    checkStats: function(check, historyLength) {
        const historyArray = check.history;
        if (historyArray.length > 0) {
            let sum = 0,
                min = historyArray[0].time,
                max = historyArray[0].time,
                avg = 0,
                totalOutage = 0,
                checkInterval = sails.config.checkInterval,
                lastOutage = null;

            for (let i = 0; i < historyArray.length; i++) {
                if (historyArray[i].time !== null) {
                    sum += historyArray[i].time;
                    min = historyArray[i].time < min ? historyArray[i].time : min;
                    max = historyArray[i].time > max ? historyArray[i].time : max;
                } else {
                    totalOutage += checkInterval;
                    lastOutage = historyArray[i].date;
                }
            }
            avg = Math.round(sum / historyArray.length);

            const percent = 100 - (totalOutage * 100) / (historyArray.length * checkInterval);
            const availability = Utilities.customFloor(percent, 2);

            const historyShort = historyArray.slice(-historyLength);

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
