module.exports = {
    /**
     * Fetch all of the user's reportd from the DB
     * @param {Function} fetcher - a function fetching a single record
     * @param {Object} userId - the ID of the user
     */
    getReports(fetcher, userId, callback) {
        fetcher('user', userId, (err, user) => callback(err, user.reports));
    },
    markAsRead(updater, userId, reports) {
        reports.each((report) => {
            report['seen'] = true;
            return report;
        });
        updater('user', userId, { reports }, (err) => {
            if (err) sails.log.error(err);
        });
    },
    /**
     * Generate reports for a given checks array
     * @param {Object} checks - an array container check records
     */
    generateReports(checks) {
        const newReportsArray = [];
        checks.forEach((check) => {
            const newReport = Object.assign({}, Utilities.calcCheckStats(check.history), {
                checkId: check.id,
                checkName: check.name,
                date: Date.now(),
                seen: false,
            });
            newReportsArray.push(newReport);
        });

        return newReportsArray;
    },
};
