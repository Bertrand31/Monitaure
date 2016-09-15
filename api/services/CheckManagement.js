/**
 * Deletes history records older than a month
 * Accepts empty histories
 * @param {Array} historyArray - check.history
 * @return {Array}
 */
const historyGarbageCollection = (historyArray) => {
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

/**
* Calculates a check's various stats by analyzing its history
* Trims the check's history to only return a specified number of pings
*  @param {Object} check - the raw db record of a check
*  @param {Number} historyLength - the number of history entries to return
*  @returns {Object}
*/
const calcCheckStats = (check, historyLength) => {
    const historyArray = check.history;

    if (historyArray.length === 0) {
        return null;
    }

    const checkInterval = sails.config.checkInterval;
    let sum = 0;
    let min = historyArray[0].duration;
    let max = historyArray[0].duration;
    let totalOutage = 0;
    let lastOutage = null;

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

    const percent = 100 - (totalOutage * 100) / (historyArray.length * checkInterval);

    return {
        id: check.id,
        name: check.name,
        min,
        max,
        avg: Math.round(sum / historyArray.length),
        availability: Utilities.customFloor(percent, 2),
        lastOutage,
        history: historyArray.slice(-historyLength),
    };
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
    createCheck(fetcher, creator, userId, checkData, callback) {
        fetcher('user', userId, 'checks', (err, user) => {
            if (err) return callback(err);

            // We test the number of checks this user has against the limit
            const checksNbLimit = (typeof sails !== 'undefined') ? sails.config.checkNbLimit : 10;

            if (user.checks.length >= checksNbLimit) {
                return callback('You reached the limit of ten checks per user');
            } else if (!Utilities.isDomainNameOrIP(checkData.domainNameOrIP)) {
                return callback('Incorrect domain name or IP address');
            } else if (!checkData.name || !checkData.port) {
                return callback('Incorrect attributes');
            }

            return creator('check', checkData, (err, created) => callback(err, created));
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
    updateCheck(fetcher, updater, userId, checkId, data, callback) {
        fetcher('check', checkId, (err, check) => {
            if (err) return callback(err);

            if (check.owner !== userId) {
                return callback('You do not have access to this check');
            }

            return updater('check', { id: checkId }, data, (err, updated) => callback(err, updated));
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
    destroyCheck(fetcher, destroyer, userId, checkId, callback) {
        fetcher('check', checkId, (err, check) => {
            if (err) return callback(err);

            if (check.owner !== userId) {
                return callback('You do not have access to this check');
            }

            return destroyer('check', checkId, (err, destroyed) => callback(err, destroyed));
        });
    },

    /**
     * Insert a ping into a check's history
     * @param {Function} fetcher - a function fetching a single record
     * @param {Function} updater - a function updating a record
     * @param {Object} ping - the result of a connexion attempt to a check
     */
    insertHistory(fetcher, updater, ping, callback) {
        fetcher('check', ping.checkId, (err, check) => {
            if (err) return callback(err);

            const newHistoryArray = historyGarbageCollection(check.history);
            newHistoryArray.push({ date: ping.date, duration: ping.open ? ping.duration : null });

            // And update the DB record
            updater('check', { id: check.id }, { history: newHistoryArray }, (err) => {
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
    getData(fetcher, userId, checkId, callback) {
        fetcher('check', checkId, (err, check) => {
            if (err) {
                return callback(err);
            } else if (check.owner !== userId) {
                return callback('You do not have access to this check');
            } else {
                const checkStats = calcCheckStats(check, 20);
                if (!checkStats) {
                    return callback('No data yet!');
                }
                return callback(null, checkStats);
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
    getUserAndGlobalStats(fetcher, userId, callback) {
        fetcher('user', userId, 'checks', (err, user) => {
            const lastError = { time: null, checkName: null };
            let checksUp = 0;
            const numberOfChecks = user.checks.length;
            let availabilitiesSum = 0;

            for (let i = 0; i < user.checks.length; i++) {
                const checkStats = calcCheckStats(user.checks[i], 1);
                // If (checkStats == null) the check's history array is null: we have no data to process
                if (checkStats !== null) {
                    // If current check is currently up, we increment checksUp array
                    // We do that by looking up his last 'history' array value
                    if (checkStats.history[checkStats.history.length - 1].duration !== null) {
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

            return callback(err, {
                user: {
                    username: user.username,
                    emailHash: user.emailHash,
                },
                checks: user.checks,
                globalStats: {
                    numberOfChecks,
                    checksUp,
                    availabilitiesAvg,
                    lastError,
                },
            });
        });
    },
};
