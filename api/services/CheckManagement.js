/**
* Calculates a check's various stats by analyzing its history
* Trims the check's history to only return a specified number of pings
*  @param {Object} check - the raw db record of a check
*  @param {Number} historyLength - the number of history entries to return
*  @returns {Object}
*/
const calcCheckStats = (check, historyLength) => {
    const historyArray = check.history;
    const historyArrayLength = historyArray.length;

    if (historyArray.length === 0) {
        return null;
    }

    const checkInterval = sails.config.checkInterval;
    let sum = 0;
    let min = historyArray[0].duration;
    let max = historyArray[0].duration;
    let totalOutage = 0;
    let lastOutage = null;

    historyArray.forEach((ping) => {
        if (ping.duration !== null) {
            sum += ping.duration;
            min = ping.duration < min ? ping.duration : min;
            max = ping.duration > max ? ping.duration : max;
        } else {
            totalOutage += checkInterval;
            lastOutage = ping.date;
        }
    });

    const percent = 100 - (totalOutage * 100) / (historyArrayLength * checkInterval);

    return {
        min,
        max,
        avg: Math.round(sum / historyArrayLength),
        availability: Utilities.customFloor(percent, 2),
        lastOutage,
        history: historyArray.slice(-historyLength),
    };
};

module.exports = {
    /**
     * Retrieve a user's checks, calcs each check's statistics
     * and adds it to each check properties
     * @param {Function} fetcher - record fetching and population function
     * @param {String} userId - the id of the user requesting this action
     * @param {Function} callback
     */
    getChecks(fetcher, userId, callback) {
        fetcher('check', { owner: userId }, (err, checksArray) => {
            const checksObject = {};

            checksArray.forEach((check) => {
                checksObject[check.id] = Object.assign(check, calcCheckStats(check, 20));
            });

            return callback(err, checksObject);
        });
    },

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

            if (user.checks.length >= sails.config.checkNbLimit) {
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

            return destroyer('check', checkId, (err, destroyed) => callback(err));
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

            const newHistoryArray = Utilities.garbageCollection(check.history);
            newHistoryArray.push({ date: ping.date, duration: ping.open ? ping.duration : null });

            // And update the DB record
            updater('check', { id: check.id }, { history: newHistoryArray }, (err) => {
                if (err) return callback(err);

                return callback(null);
            });
        });
    },
};
