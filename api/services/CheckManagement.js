/**
 * Deletes history records older than a month
 * Accepts empty histories
 * @param {Array} historyArray - check.history
 */
const cleanHistory = function(historyArray) {
    if (typeof historyArray[0] === 'undefined') return [];

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // If the first value of the array is older than a month, we remove it
    // We keep doing that until the oldest value is younger than a month
    while (historyArray[0].date.getTime() < oneMonthAgo.getTime()) {
        historyArray.shift();
    }
    return historyArray;
};

module.exports = {

    /**
     * Creates a check in the database and returns it
     * @param {Function} fetcher - record fetching and population function
     * @param {Function} creator - create a record with provided data
     * @param {String} userId - the id of the user requesting this action
     * @param {Object} checkData - the attributes of the check to create
     * @param {Function} callback
     */
    createCheck: function(fetcher, creator, userId, checkData, callback) {
        fetcher('user', userId, 'checks', function(err, user) {
            if (err) return callback(err);

            // We test the number of checks this user has against the limit
            const checksNbLimit = (typeof sails !== 'undefined') ? sails.config.checkNbLimit : 10;
            if (user.checks.length >= checksNbLimit) {
                return callback('You reached the limit of ten checks per user');
            } else if (!Utilities.isDomainNameOrIP(checkData.domainNameOrIP)) {
                return callback('Incorrect domain name or IP address');
            } else if (!checkData.name || !checkData.port) {
                return callback('Incorrect attributes');
            } else {
                creator('check', checkData, function (err, created) {
                    return callback(err, created);
                });
            }
        });
    },

    /**
     * Update a check's name and notifications preferences
     * @param {Function} fetcher - a function fetching a single record
     * @param {Function} updater - a function updating a record's content
     * @param {String} userId - the id of the user requesting this action
     * @param {String} checkId - the id of the check to update
     * @param {Object} data - the attributes to update and their new contents
     * @param {Function} callback
     */
    updateCheck: function(fetcher, updater, userId, checkId, data, callback) {
        fetcher('check', checkId, function (err, check) {
            if (err) return callback(err);

            if (check.owner !== userId) {
                return callback('You do not have access to this check');
            } else {
                updater('check', { id: checkId }, data, function (err, updated) {
                    return callback(err, updated);
                });
            }
        });
    },

    /**
     * Destroy specified check from the dabatase
     * @param {Function} fetcher - a function fetching a single record
     * @param {Function} destroyer - a function destroying a record
     * @param {String} userId - the id of the user requesting this action
     * @param {String} checkId - the id of the check to destroy
     * @param {Function} callback
     */
    destroyCheck: function(fetcher, destroyer, userId, checkId, callback) {
        fetcher('check', checkId, function(err, check) {
            if (err) return callback(err);

            if (check.owner !== userId) {
                return callback('You do not have access to this check');
            } else {
                destroyer('check', checkId, function (err, destroyed) {
                    return callback(err, destroyed);
                });
            }
        });
    },

    /**
     * Insert a ping into a check's history
     * @param {Function} fetcher - a function fetching a single record
     * @param {Function} updater - a function updating a record
     * @param {Object} ping - the result of a connexion attempt to a check
     */
    insertHistory: function(fetcher, updater, ping, callback) {
        fetcher('check', ping.checkId, function (err, check) {
            if (err) return callback(err);

            let newHistoryArray = cleanHistory(check.history);

            newHistoryArray.push({ date: ping.date, duration: ping.open ? ping.duration : null });

            // And update the DB record
            updater('check', { id: check.id }, { history: newHistoryArray }, function(err) {
                if (err) return callback(err);

                return callback(null);
            });

        });
    },

    /**
     * Retrieves a check's data, including its last 20 pings
     * @param {Function} fetcher - a function fetching a single record
     * @param {String} userId - the id of the user requesting this action
     * @param {String} checkId - the id of the check to retrieve data from
     * @param {Funtion} callback
     */
    getData: function(fetcher, userId, checkId, callback) {
        fetcher('check', checkId, function (err, check) {
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
     * @param {Function} fetcher - a function fetching a single record
     * @param {String} userId - the id of the user requesting this action
     * @param {String} checkId - the id of the check to retrieve data from
     * @param {Function} callback
     */
    getCheckMinimalData: function(fetcher, userId, checkId, callback) {
        fetcher('check', checkId, function (err, check) {
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
     * @param {Function} fetcher - record fetching and population function
     * @param {String} userId - the id of the user requesting this action
     * @param {Function} callback
     */
    getUserAndChecksData: function(fetcher, userId, callback) {
        fetcher('user', userId, 'checks', function(err, user) {

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
                    if (checkStats.history[checkStats.history.length - 1].duration !== null) {
                        checksUp++;
                    }
                    // We add current check's availability stats to the availabilities sum
                    availabilitiesSum += checkStats.availability;
                    // If current check's last outage is more recent than the one
                    // stored in lastError, we update the lastError object
                    if (checkStats.lastOutage > lastError.duration) {
                        lastError.duration = checkStats.lastOutage;
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
     * Calculates a check's various stats by analyzing its history
     * Trims the check's history to only return a specified number of pings
     *  @param {Object} check - the raw db record of a check
     *  @param {Number} historyLength - the number of history entries to return
     */
    checkStats: function(check, historyLength) {
        const historyArray = check.history;
        if (historyArray.length > 0) {
            let sum = 0,
                min = historyArray[0].duration,
                max = historyArray[0].duration,
                avg = 0,
                totalOutage = 0,
                checkInterval = sails.config.checkInterval,
                lastOutage = null;

            for (let i = 0; i < historyArray.length; i++) {
                if (historyArray[i].duration !== null) {
                    sum += historyArray[i].duration;
                    min = historyArray[i].duration < min ? historyArray[i].duration : min;
                    max = historyArray[i].duration > max ? historyArray[i].duration : max;
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
                id: check.id,
                name: check.name,
                min,
                max,
                avg,
                availability,
                lastOutage,
                history: historyShort
            };
        } else {
            return null;
        }
    }
};
