const { garbageCollection } = require('./Utilities');

module.exports = {
    /**
     * Fetch all of the user's log entries from the DB
     * @param {Function} fetcher - a function fetching a single record
     * @param {Object} userId - the ID of the user
     */
    getLogs: (fetcher, userId, callback) => {
        fetcher('user', userId, (err, user) => {
			return callback(err, user.log);
		});
    },

    /**
     * Mark all log items as read
     * @param {Function} updater - updates a DB record
     * @param {Object} userId - the ID of the user
     * @param {Array} log - a log array
     */
	markAllAsRead: (updater, userId, log) => {
        log.map(logEntry => logEntry.seen = true);

        updater('user', { id: userId }, { log }, (err) => {
            if (err) sails.log.error(err);
        });
    },

    /**
     * Adds a log entry to the user
     * @param {Function} updater - updates a DB record
     * @param {Object} user - a user object from the database
     * @param {String} logType - the log entry type
     * @param {String} logType - the log entry message
     */
    addLogEntry: (updater, user, checkId, checkName, logType, logMessage) => {
        const newLogEntry = {
            date: new Date(),
            checkId,
            checkName,
            type: logType,
            message: logMessage,
            seen: false,
        };

        const log = garbageCollection(user.log, new Date());
        log.push(newLogEntry);

        updater('user', { id: user.id }, { log }, (err) => {
            if (err) sails.log.error(err);
        });
    },
};
