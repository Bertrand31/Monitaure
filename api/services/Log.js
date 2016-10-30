module.exports = {
    /**
     * Fetch all of the user's log entries from the DB
     * @param {Function} fetcher - a function fetching a single record
     * @param {Object} userId - the ID of the user
     */
    getLogs(fetcher, userId, callback) {
        fetcher('user', userId, (err, user) => callback(err, user.log));
    },
    /**
     * Adds a log entry to the user
     * @param {Function} updater - update a DB record
     * @param {Object} user - a user object from the database
     * @param {String} logType - the log entry type
     * @param {String} logType - the log entry message
     */
    addLogEntry(updater, user, checkId, checkName, logType, logMessage) {
        const newLogEntry = {
            date: new Date(),
            checkId,
            checkName,
            type: logType,
            message: logMessage,
        };

        const log = Utilities.garbageCollection(user.log, new Date());
        log.push(newLogEntry);

        updater('user', { id: user.id }, { log }, (err) => {
            if (err) sails.log.error(err);
        });
    },
};
